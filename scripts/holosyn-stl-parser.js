// HOLOSYN — STL parser
//
// STL is what a maker actually hands a slicer, so the bench has to open it.
// Written here rather than vendored: the format is a few dozen lines, and
// this keeps the offline bundle free of another dependency to track.
//
// Binary  — 80-byte header, uint32 triangle count, then 50 bytes per
//           triangle: 3 floats normal, 3x3 floats vertices, uint16 attribute.
// ASCII   — "solid" / "facet normal x y z" / "vertex x y z" x3.
//
// STL carries no units and no scene graph: one solid, no parts, no materials.
// The measurement scale treats it as unknown for exactly that reason, and the
// exploded view has nothing to separate — both are stated to the presenter
// rather than guessed at.
//
// Split out of app.js. Classic script, shared global scope.

// A binary STL's size is fully determined by its triangle count. ASCII files
// that happen to start with "solid" are common, so the count is what decides,
// not the leading word.
function isBinaryStl(buffer) {
    const HEADER = 84;
    if (buffer.byteLength < HEADER) return false;
    const view = new DataView(buffer);
    const triangles = view.getUint32(80, true);
    return HEADER + triangles * 50 === buffer.byteLength;
}

function parseBinaryStl(buffer) {
    const view = new DataView(buffer);
    const triangles = view.getUint32(80, true);
    if (triangles === 0) throw new Error('STL contains no triangles.');

    const positions = new Float32Array(triangles * 9);
    const normals = new Float32Array(triangles * 9);

    for (let i = 0; i < triangles; i++) {
        const offset = 84 + i * 50;
        const nx = view.getFloat32(offset, true);
        const ny = view.getFloat32(offset + 4, true);
        const nz = view.getFloat32(offset + 8, true);
        for (let v = 0; v < 3; v++) {
            const p = offset + 12 + v * 12;
            const target = i * 9 + v * 3;
            positions[target] = view.getFloat32(p, true);
            positions[target + 1] = view.getFloat32(p + 4, true);
            positions[target + 2] = view.getFloat32(p + 8, true);
            normals[target] = nx;
            normals[target + 1] = ny;
            normals[target + 2] = nz;
        }
    }
    return { positions, normals, triangles };
}

function parseAsciiStl(text) {
    const positions = [];
    const normals = [];
    // One regex per facet keeps malformed whitespace from splitting a triangle.
    const facetPattern = /facet\s+normal\s+([^]*?)endfacet/gi;
    const numberPattern = /-?[\d.]+(?:[eE][+-]?\d+)?/g;
    let facet;
    while ((facet = facetPattern.exec(text)) !== null) {
        const numbers = facet[1].match(numberPattern);
        // 3 for the normal + 9 for three vertices
        if (!numbers || numbers.length < 12) continue;
        const nx = parseFloat(numbers[0]);
        const ny = parseFloat(numbers[1]);
        const nz = parseFloat(numbers[2]);
        for (let v = 0; v < 3; v++) {
            const base = 3 + v * 3;
            positions.push(parseFloat(numbers[base]), parseFloat(numbers[base + 1]), parseFloat(numbers[base + 2]));
            normals.push(nx, ny, nz);
        }
    }
    if (positions.length === 0) throw new Error('No facets found in the ASCII STL.');
    return {
        positions: new Float32Array(positions),
        normals: new Float32Array(normals),
        triangles: positions.length / 9
    };
}

// Returns a THREE.Group holding one mesh, so it drops into the same path the
// GLTF and OBJ loaders feed.
function parseStl(buffer) {
    const parsed = isBinaryStl(buffer)
        ? parseBinaryStl(buffer)
        : parseAsciiStl(new TextDecoder('utf-8').decode(buffer));

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(parsed.positions, 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(parsed.normals, 3));
    // Some exporters write zero normals; recompute when that happens so the
    // model is not lit as a flat silhouette.
    const firstNormalIsZero = parsed.normals[0] === 0 && parsed.normals[1] === 0 && parsed.normals[2] === 0;
    if (firstNormalIsZero) geometry.computeVertexNormals();
    geometry.computeBoundingBox();

    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0xcfd6e4, metalness: 0.1, roughness: 0.8 }));
    mesh.name = 'stl-solid';
    const group = new THREE.Group();
    group.name = 'STL';
    group.add(mesh);
    group.userData.stlTriangleCount = parsed.triangles;
    group.userData.stlBinary = isBinaryStl(buffer);
    return group;
}
