// HOLOSYN — sample prototypes
//
// The five procedural models in the sample gallery: drone, ring, car, core
// cell, exo suit. Pure Three.js geometry — each returns a group of hologram
// nodes built with buildHologramNode() from app.js and tagged with part names
// that Part Scan and the exploded view pick up. No UI, no state.
//
// Split out of app.js. Classic script, shared global scope.

function applyPartPalette(nodeGroup, colorHex, options = {}) {
    if (!nodeGroup || !colorHex) return nodeGroup;
    const color = new THREE.Color(colorHex);
    const productColor = new THREE.Color(options.productColor || colorHex);
    nodeGroup.userData.paletteColor = colorHex;
    nodeGroup.userData.paletteWireOpacity = options.wireOpacity || 0.72;
    nodeGroup.userData.palettePointsOpacity = options.pointsOpacity || 0.82;
    if (nodeGroup.userData.solidMaterial) {
        nodeGroup.userData.solidMaterial.color.copy(color);
        if (nodeGroup.userData.productMaterial?.color) {
            nodeGroup.userData.productMaterial.color.copy(productColor);
        }
        if (options.emissiveColor && nodeGroup.userData.solidMaterial.emissive) {
            nodeGroup.userData.emissiveColor = options.emissiveColor;
            nodeGroup.userData.emissiveIntensity = options.emissiveIntensity || 0.35;
            nodeGroup.userData.solidMaterial.emissive.copy(new THREE.Color(options.emissiveColor));
            nodeGroup.userData.solidMaterial.emissiveIntensity = nodeGroup.userData.emissiveIntensity;
            if (nodeGroup.userData.productMaterial?.emissive) {
                nodeGroup.userData.productMaterial.emissive.copy(new THREE.Color(options.productEmissiveColor || options.emissiveColor));
                nodeGroup.userData.productMaterial.emissiveIntensity = options.productEmissiveIntensity ?? Math.min(nodeGroup.userData.emissiveIntensity, 0.35);
            }
        }
    }
    if (nodeGroup.userData.wireMesh && nodeGroup.userData.wireMesh.material) {
        const wireMaterial = nodeGroup.userData.wireMesh.material.clone();
        wireMaterial.color.copy(color);
        wireMaterial.opacity = nodeGroup.userData.paletteWireOpacity * state.glowIntensity;
        nodeGroup.userData.wireMesh.material = wireMaterial;
        nodeGroup.userData.wireMaterial = wireMaterial;
    }
    if (nodeGroup.userData.pointsMesh && nodeGroup.userData.pointsMesh.material) {
        const pointsMaterial = nodeGroup.userData.pointsMesh.material.clone();
        pointsMaterial.color.copy(color);
        pointsMaterial.opacity = nodeGroup.userData.palettePointsOpacity * state.glowIntensity;
        nodeGroup.userData.pointsMesh.material = pointsMaterial;
        nodeGroup.userData.pointsMaterial = pointsMaterial;
    }
    return nodeGroup;
}

// Preset A: AeroDrone construction (Standard metallic upgrades)
function createAeroDroneGeometry() {
    const drone = new THREE.Group();
    drone.name = "drone";
    
    const frameGeo = new THREE.BoxGeometry(0.8, 0.25, 0.8);
    const bodyMesh = buildHologramNode(frameGeo, false);
    bodyMesh.name = "chassis";
    bodyMesh.userData.explodedOffset = new THREE.Vector3(0, 0, 0);
    drone.add(bodyMesh);
    
    const domeGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const domeMesh = buildHologramNode(domeGeo, false);
    domeMesh.name = "dome";
    domeMesh.position.y = 0.15;
    domeMesh.userData.explodedOffset = new THREE.Vector3(0, 0.7, 0);
    drone.add(domeMesh);
    
    const armLengths = [-1, 1];
    armLengths.forEach(x => {
        armLengths.forEach(z => {
            const subAssembly = new THREE.Group();
            subAssembly.name = "chassis-arm";
            subAssembly.position.set(x * 0.4, 0, z * 0.4);
            
            const armGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8);
            const armMesh = buildHologramNode(armGeo, false);
            armMesh.rotation.x = Math.PI / 2;
            armMesh.rotation.z = Math.atan2(z, x) + Math.PI / 4;
            subAssembly.add(armMesh);
            
            const motorGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.15, 8);
            const motorMesh = buildHologramNode(motorGeo, false);
            motorMesh.position.set(x * 0.35, 0.1, z * 0.35);
            subAssembly.add(motorMesh);
            
            const rotorGeo = new THREE.BoxGeometry(0.75, 0.01, 0.05);
            const rotorMesh = buildHologramNode(rotorGeo, true); // Polished chrome rotor!
            rotorMesh.position.set(x * 0.35, 0.18, z * 0.35);
            rotorMesh.name = "rotor";
            subAssembly.add(rotorMesh);
            
            subAssembly.userData.explodedOffset = new THREE.Vector3(x * 0.8, 0.1, z * 0.8);
            drone.add(subAssembly);
        });
    });
    
    const camGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.2, 8);
    const camMesh = buildHologramNode(camGeo, false);
    camMesh.name = "camera";
    camMesh.position.y = -0.22;
    camMesh.userData.explodedOffset = new THREE.Vector3(0, -0.8, 0);
    drone.add(camMesh);
    
    return drone;
}

// Preset B: Nexus Ring geometry
function createNexusRingGeometry() {
    const ringGroup = new THREE.Group();
    ringGroup.name = "ring";
    
    const outerTorusGeo = new THREE.TorusGeometry(1.2, 0.1, 12, 48);
    const outerTorus = buildHologramNode(outerTorusGeo, false);
    outerTorus.name = "outer";
    outerTorus.userData.explodedOffset = new THREE.Vector3(0, 0, 0);
    ringGroup.add(outerTorus);
    
    const gyro1Geo = new THREE.TorusGeometry(0.85, 0.05, 8, 36);
    const gyro1 = buildHologramNode(gyro1Geo, true); // Polished chrome gyro 1!
    gyro1.name = "gyro1";
    gyro1.userData.explodedOffset = new THREE.Vector3(0, 0.6, 0);
    ringGroup.add(gyro1);
    
    const gyro2Geo = new THREE.TorusGeometry(0.55, 0.035, 8, 24);
    const gyro2 = buildHologramNode(gyro2Geo, true); // Polished chrome gyro 2!
    gyro2.name = "gyro2";
    gyro2.userData.explodedOffset = new THREE.Vector3(0, -0.6, 0);
    ringGroup.add(gyro2);
    
    const coreGeo = new THREE.IcosahedronGeometry(0.25, 1);
    const core = buildHologramNode(coreGeo, true); // Core!
    core.name = "gyro-core";
    core.userData.explodedOffset = new THREE.Vector3(0, 0, 0.8);
    ringGroup.add(core);
    
    for (let i = 0; i < 4; i++) {
        const orbitNodeGeo = new THREE.SphereGeometry(0.06, 8, 8);
        const node = buildHologramNode(orbitNodeGeo, false);
        const angle = (i / 4) * Math.PI * 2;
        node.position.set(Math.cos(angle) * 1.5, 0, Math.sin(angle) * 1.5);
        node.name = `node-${i}`;
        node.userData.explodedOffset = new THREE.Vector3(Math.cos(angle) * 0.8, 0, Math.sin(angle) * 0.8);
        ringGroup.add(node);
    }
    
    return ringGroup;
}

// Preset C: HyperCar geometry
function createHyperCarGeometry() {
    const car = new THREE.Group();
    car.name = "car";
    
    const bodyGeo = new THREE.BoxGeometry(2.1, 0.22, 0.9);
    const body = buildHologramNode(bodyGeo, false);
    body.name = "body";
    body.position.y = 0.05;
    body.userData.explodedOffset = new THREE.Vector3(0, 0, 0);
    car.add(body);
    
    const cabinGeo = new THREE.ConeGeometry(0.5, 0.65, 4);
    const cabin = buildHologramNode(cabinGeo, false);
    cabin.name = "cabin";
    cabin.rotation.y = Math.PI / 4;
    cabin.rotation.x = -Math.PI / 6;
    cabin.scale.set(1.4, 0.6, 1.2);
    cabin.position.set(-0.15, 0.25, 0);
    cabin.userData.explodedOffset = new THREE.Vector3(-0.4, 0.6, 0);
    car.add(cabin);
    
    const spoilerGeo = new THREE.BoxGeometry(0.12, 0.2, 0.8);
    const spoiler = buildHologramNode(spoilerGeo, false);
    spoiler.name = "spoiler";
    spoiler.position.set(0.85, 0.2, 0);
    spoiler.userData.explodedOffset = new THREE.Vector3(0.5, 0.5, 0);
    car.add(spoiler);
    
    const wheelPositions = [
        { x: -0.7, z: -0.5 },
        { x: -0.7, z: 0.5 },
        { x: 0.7, z: -0.5 },
        { x: 0.7, z: 0.5 }
    ];
    wheelPositions.forEach((pos, idx) => {
        const wheelGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.16, 12);
        const wheel = buildHologramNode(wheelGeo, true); // Polished chrome wheel rim!
        wheel.rotation.x = Math.PI / 2;
        wheel.position.set(pos.x, -0.05, pos.z);
        wheel.name = `wheel-${idx}`;
        wheel.userData.explodedOffset = new THREE.Vector3(0, -0.2, pos.z * 1.2);
        car.add(wheel);
    });
    
    return car;
}

// Preset D: Chronos Battery Cell geometry
function createChronosCoreGeometry() {
    const battery = new THREE.Group();
    battery.name = "battery";
    
    const tubeGeo = new THREE.CylinderGeometry(0.6, 0.6, 1.8, 16, 4, true);
    const tube = buildHologramNode(tubeGeo, false);
    tube.name = "tube";
    tube.userData.explodedOffset = new THREE.Vector3(0, 0, 0);
    battery.add(tube);
    
    const rodGeo = new THREE.CylinderGeometry(0.18, 0.18, 2.0, 8);
    const rod = buildHologramNode(rodGeo, true); // Chrome rod!
    rod.name = "rod";
    rod.userData.explodedOffset = new THREE.Vector3(0.8, 0, 0.8);
    battery.add(rod);

    const ring1Geo = new THREE.TorusGeometry(0.42, 0.04, 8, 24);
    const ring1 = buildHologramNode(ring1Geo, true);
    ring1.name = "plasma-ring-1";
    ring1.position.set(0, -0.3, 0);
    ring1.userData.explodedOffset = new THREE.Vector3(-0.8, -0.4, 0.8);
    battery.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(0.42, 0.04, 8, 24);
    const ring2 = buildHologramNode(ring2Geo, true);
    ring2.name = "plasma-ring-2";
    ring2.position.set(0, 0.3, 0);
    ring2.userData.explodedOffset = new THREE.Vector3(-0.8, 0.4, 0.8);
    battery.add(ring2);

    const capGeo = new THREE.CylinderGeometry(0.58, 0.58, 0.1, 16);
    const cap = buildHologramNode(capGeo, false);
    cap.name = "cap";
    cap.position.set(0, 0.9, 0);
    cap.userData.explodedOffset = new THREE.Vector3(0, 0.9, -0.4);
    battery.add(cap);
    
    return battery;
}

// Preset E: Forge Exo-Suit - 3D Hologram
// Uses LatheGeometry (helmet dome), ExtrudeGeometry (faceplate, eyes, chest, boots)
function createForgeExoSuitGeometry() {
    // Required smoke test checkpoints:
    // EXO BUILD-II PROTOTYPE, FORGE DYNAMICS, faceplate, eye-r, reactor-core, palm-emitter-r, boot-jet-r
    const suit = new THREE.Group();
    suit.name = "exosuit";

    // Hologram palette stays cyan; product reveal uses a grounded finish palette.
    const C = {
        red: '#005588', dk: '#002244', gold: '#00aaff', lt: '#44ccff',
        jnt: '#001122', met: '#004466', gl: '#88eeff', glH: '#ffffff', eye: '#ffffff'
    };
    const P = {
        red: '#8f2028', dk: '#171b22', gold: '#c5a15a', lt: '#c7d0d8',
        jnt: '#101318', met: '#626d78', gl: '#7de3f4', glH: '#eafcff', eye: '#eafcff'
    };

    // Part builder
    const mk = (nm, geo, p, ex, o={}) => {
        const nd = buildHologramNode(geo, !!o.chr);
        nd.name = nm;
        nd.position.set(p[0],p[1],p[2]);
        if(o.r) nd.rotation.set(o.r[0]||0, o.r[1]||0, o.r[2]||0);
        if(o.s) nd.scale.set(o.s[0]||1, o.s[1]||1, o.s[2]||1);
        nd.userData.explodedOffset = new THREE.Vector3(ex[0],ex[1],ex[2]);
        if(o.c) {
            const role = Object.keys(C).find(key => C[key] === o.c);
            applyPartPalette(nd, o.c, {
                emissiveColor: o.ec,
                emissiveIntensity: o.ei,
                productColor: o.pc || (role ? P[role] : o.c),
                productEmissiveColor: o.pec || (o.ec ? P.glH : undefined),
                productEmissiveIntensity: o.pei
            });
        }
        suit.add(nd);
        return nd;
    };

    const shapeFromPts = (pts) => {
        const s = new THREE.Shape();
        s.moveTo(pts[0][0], pts[0][1]);
        for (let i=1; i<pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
        s.closePath();
        return s;
    };

    const bev = (d, t=0.008) => ({depth:d, bevelEnabled:true, bevelThickness:t, bevelSize:t, bevelSegments:2});
    const flat = (d) => ({depth:d, bevelEnabled:false});

    // =================================================================
    //  1. HELMET
    // =================================================================
    const helmetPts = [
        [0.00, 0.30], [0.06, 0.29], [0.13, 0.26], [0.19, 0.20],
        [0.23, 0.11], [0.24, 0.02], [0.23,-0.06], [0.20,-0.12],
        [0.16,-0.17], [0.10,-0.21], [0.05,-0.23], [0.00,-0.24]
    ].map(v => new THREE.Vector2(v[0], v[1]));
    mk("helmet", new THREE.LatheGeometry(helmetPts, 24), [0,1.40,-0.02], [0,0.92,0.10], {s:[0.88,1.0,0.94], c:C.red});

    const fpGeo = new THREE.ExtrudeGeometry(shapeFromPts([
        [0, 0.12],[-0.12, 0.10],[-0.15, 0.03],[-0.14,-0.04],
        [-0.10,-0.10],[-0.04,-0.13],[0,-0.14],[0.04,-0.13],
        [0.10,-0.10],[0.14,-0.04],[0.15, 0.03],[0.12, 0.10]
    ]), bev(0.05));
    mk("faceplate", fpGeo, [0,1.36,0.16], [0,0.96,0.56], {c:C.gold, chr:true});

    const eyeL = new THREE.ExtrudeGeometry(shapeFromPts([
        [-0.042,0.007],[-0.012,0.013],[0.032,0.005],
        [0.042,-0.005],[0.016,-0.009],[-0.032,-0.001]
    ]), flat(0.018));
    mk("eye-l", eyeL, [-0.062,1.41,0.22], [-0.10,1.00,0.58], {chr:true, c:C.eye, ec:C.glH, ei:1.8});

    const eyeR = new THREE.ExtrudeGeometry(shapeFromPts([
        [0.042,0.007],[0.012,0.013],[-0.032,0.005],
        [-0.042,-0.005],[-0.016,-0.009],[0.032,-0.001]
    ]), flat(0.018));
    mk("eye-r", eyeR, [0.062,1.41,0.22], [0.10,1.00,0.58], {chr:true, c:C.eye, ec:C.glH, ei:1.8});

    mk("brow", new THREE.BoxGeometry(0.30,0.03,0.08), [0,1.47,0.14], [0,1.06,0.48], {c:C.red});
    mk("crest", new THREE.BoxGeometry(0.05,0.04,0.30), [0,1.52,0.0], [0,1.12,0.0], {c:C.dk});
    mk("jaw-l", new THREE.BoxGeometry(0.08,0.10,0.12), [-0.13,1.25,0.12], [-0.16,0.84,0.46], {r:[0,-0.08,0], c:C.gold, chr:true});
    mk("jaw-r", new THREE.BoxGeometry(0.08,0.10,0.12), [0.13,1.25,0.12], [0.16,0.84,0.46], {r:[0,0.08,0], c:C.gold, chr:true});
    mk("chin", new THREE.BoxGeometry(0.10,0.05,0.08), [0,1.17,0.18], [0,0.76,0.54], {c:C.gold, chr:true});
    mk("cheek-l", new THREE.BoxGeometry(0.05,0.10,0.10), [-0.17,1.32,0.08], [-0.22,0.94,0.42], {c:C.red});
    mk("cheek-r", new THREE.BoxGeometry(0.05,0.10,0.10), [0.17,1.32,0.08], [0.22,0.94,0.42], {c:C.red});
    mk("neck", new THREE.CylinderGeometry(0.13,0.17,0.10,14), [0,1.08,0], [0,0.68,0.04], {c:C.jnt});

    // =================================================================
    //  2. TORSO
    // =================================================================
    const chestGeo = new THREE.ExtrudeGeometry(shapeFromPts([
        [0,0.18],[-0.22,0.16],[-0.36,0.08],[-0.38,-0.02],
        [-0.34,-0.14],[-0.18,-0.17],[0,-0.18],
        [0.18,-0.17],[0.34,-0.14],[0.38,-0.02],[0.36,0.08],[0.22,0.16]
    ]), bev(0.28, 0.015));
    mk("chest", chestGeo, [0,0.82,-0.08], [0,0.18,0.16], {c:C.red});

    mk("pec-l", new THREE.BoxGeometry(0.24,0.14,0.06), [-0.14,0.82,0.18], [-0.12,0.16,0.36], {r:[0,0.10,0], c:C.red});
    mk("pec-r", new THREE.BoxGeometry(0.24,0.14,0.06), [0.14,0.82,0.18], [0.12,0.16,0.36], {r:[0,-0.10,0], c:C.red});
    mk("collar-l", new THREE.BoxGeometry(0.22,0.04,0.28), [-0.26,0.98,0.02], [-0.12,0.32,0.10], {c:C.gold});
    mk("collar-r", new THREE.BoxGeometry(0.22,0.04,0.28), [0.26,0.98,0.02], [0.12,0.32,0.10], {c:C.gold});

    mk("reactor-ring", new THREE.TorusGeometry(0.09,0.016,12,24), [0,0.78,0.19], [0,0.22,0.52], {r:[Math.PI/2,0,0], c:C.lt, chr:true});
    mk("reactor-core", new THREE.SphereGeometry(0.06,16,12), [0,0.78,0.20], [0,0.22,0.58], {chr:true, c:C.gl, ec:C.glH, ei:1.6});
    mk("reactor-housing", new THREE.CylinderGeometry(0.12,0.12,0.02,3), [0,0.78,0.175], [0,0.22,0.48], {r:[Math.PI/2,0,Math.PI], c:C.met, chr:true});

    mk("mid-torso", new THREE.BoxGeometry(0.62,0.12,0.28), [0,0.62,0], [0,0.02,0.08], {c:C.dk});

    for (let r=0; r<3; r++) {
        const y = 0.48 - r*0.10;
        mk(`ab-l-${r}`, new THREE.BoxGeometry(0.13,0.08,0.05), [-0.08,y,0.15], [-0.10,-0.10-r*0.08,0.28], {c:r===0?C.red:C.dk});
        mk(`ab-r-${r}`, new THREE.BoxGeometry(0.13,0.08,0.05), [0.08,y,0.15], [0.10,-0.10-r*0.08,0.28], {c:r===0?C.red:C.dk});
    }

    mk("ab-line", new THREE.BoxGeometry(0.012,0.28,0.035), [0,0.38,0.16], [0,-0.18,0.30], {c:C.lt, chr:true});
    mk("side-l", new THREE.BoxGeometry(0.05,0.38,0.22), [-0.38,0.70,0], [-0.28,0.10,0], {c:C.dk});
    mk("side-r", new THREE.BoxGeometry(0.05,0.38,0.22), [0.38,0.70,0], [0.28,0.10,0], {c:C.dk});
    mk("pelvis", new THREE.BoxGeometry(0.58,0.14,0.26), [0,0.18,0], [0,-0.28,0], {c:C.red});
    mk("groin-guard", new THREE.BoxGeometry(0.18,0.10,0.14), [0,0.08,0.05], [0,-0.36,0.08], {c:C.gold});

    // =================================================================
    //  3. ARMS & LEGS
    // =================================================================
    [{s:"l",d:-1},{s:"r",d:1}].forEach(({s,d}) => {
        mk(`pauldron-${s}`, new THREE.SphereGeometry(0.18,14,10), [d*0.50,0.96,0], [d*0.70,0.38,0.14], {s:[1.3,0.7,1.1], c:C.red});
        mk(`pld-ridge-${s}`, new THREE.BoxGeometry(0.24,0.025,0.10), [d*0.50,0.98,0], [d*0.72,0.42,0.14], {c:C.gold});
        mk(`sh-joint-${s}`, new THREE.SphereGeometry(0.09,10,8), [d*0.50,0.88,0], [d*0.66,0.30,0.06], {c:C.jnt});
        mk(`bicep-${s}`, new THREE.CylinderGeometry(0.09,0.11,0.26,12), [d*0.60,0.70,0], [d*0.84,0.14,0.08], {c:C.red});
        mk(`bicep-band-${s}`, new THREE.CylinderGeometry(0.115,0.115,0.025,12), [d*0.60,0.62,0], [d*0.84,0.06,0.08], {c:C.gold});
        mk(`elbow-${s}`, new THREE.SphereGeometry(0.07,10,8), [d*0.62,0.52,0.02], [d*0.88,-0.02,0.16], {c:C.jnt});
        mk(`forearm-${s}`, new THREE.CylinderGeometry(0.10,0.08,0.28,12), [d*0.64,0.34,0.03], [d*0.92,-0.16,0.26], {c:C.red});

        const gShape = shapeFromPts([[0,0.06],[-0.07,0.05],[-0.08,0],[-0.07,-0.05],[0,-0.06],[0.07,-0.05],[0.08,0],[0.07,0.05]]);
        mk(`gauntlet-${s}`, new THREE.ExtrudeGeometry(gShape, bev(0.12, 0.006)), [d*0.65,0.16,0.0], [d*0.96,-0.30,0.36], {c:C.gold, chr:true});
        mk(`wrist-${s}`, new THREE.TorusGeometry(0.065,0.012,8,16), [d*0.65,0.20,0.03], [d*0.94,-0.26,0.32], {r:[Math.PI/2,0,0], c:C.lt, chr:true});
        mk(`hand-${s}`, new THREE.BoxGeometry(0.09,0.09,0.05), [d*0.66,0.06,0.05], [d*1.00,-0.38,0.44], {c:C.gold});
        mk(`fingers-${s}`, new THREE.BoxGeometry(0.08,0.05,0.04), [d*0.66,0.00,0.06], [d*1.02,-0.44,0.48], {c:C.red});
        mk(`thumb-${s}`, new THREE.BoxGeometry(0.025,0.05,0.035), [d*0.72,0.04,0.06], [d*1.06,-0.40,0.48], {c:C.red});
        mk(`palm-emitter-${s}`, new THREE.CylinderGeometry(0.030,0.030,0.012,14), [d*0.66,0.06,0.09], [d*1.00,-0.38,0.52], {r:[Math.PI/2,0,0], chr:true, c:C.gl, ec:C.glH, ei:1.5});

        mk(`hip-${s}`, new THREE.BoxGeometry(0.12,0.14,0.16), [d*0.20,0.10,0], [d*0.26,-0.32,0.03], {c:C.red});
        mk(`thigh-${s}`, new THREE.CylinderGeometry(0.13,0.11,0.40,12), [d*0.20,-0.16,0], [d*0.30,-0.56,0.05], {c:C.red});
        mk(`thigh-pnl-${s}`, new THREE.BoxGeometry(0.10,0.18,0.035), [d*0.20,-0.14,0.09], [d*0.30,-0.54,0.16], {c:C.gold});
        mk(`knee-${s}`, new THREE.SphereGeometry(0.07,10,8), [d*0.20,-0.38,0.02], [d*0.32,-0.72,0.12], {c:C.jnt});
        mk(`knee-cap-${s}`, new THREE.BoxGeometry(0.10,0.08,0.05), [d*0.20,-0.38,0.07], [d*0.32,-0.72,0.20], {c:C.gold});
        mk(`shin-${s}`, new THREE.CylinderGeometry(0.10,0.08,0.36,12), [d*0.20,-0.62,0.02], [d*0.34,-0.86,0.10], {c:C.red});
        mk(`shin-grd-${s}`, new THREE.BoxGeometry(0.08,0.20,0.035), [d*0.20,-0.58,0.09], [d*0.34,-0.82,0.20], {c:C.gold});
        mk(`calf-${s}`, new THREE.BoxGeometry(0.08,0.22,0.05), [d*0.20,-0.60,-0.06], [d*0.34,-0.84,-0.12], {c:C.dk});

        const bootShape = shapeFromPts([[0,0.08],[-0.08,0.07],[-0.09,0],[-0.08,-0.07],[-0.05,-0.08],[0.10,-0.08],[0.12,-0.04],[0.10,0.04],[0.06,0.07]]);
        mk(`boot-${s}`, new THREE.ExtrudeGeometry(bootShape, bev(0.16, 0.008)), [d*0.20,-0.86,-0.02], [d*0.36,-0.98,0.22], {r:[Math.PI/2,0,0], c:C.gold});
        mk(`boot-cuff-${s}`, new THREE.CylinderGeometry(0.09,0.10,0.05,12), [d*0.20,-0.80,0.02], [d*0.36,-0.92,0.14], {c:C.red});
        mk(`boot-sole-${s}`, new THREE.BoxGeometry(0.16,0.025,0.30), [d*0.20,-0.95,0.03], [d*0.36,-1.06,0.24], {c:C.jnt});
        mk(`boot-jet-${s}`, new THREE.CylinderGeometry(0.05,0.015,0.04,12), [d*0.20,-0.97,0.03], [d*0.36,-1.10,0.24], {chr:true, c:C.gl, ec:C.glH, ei:1.3});
    });

    // =================================================================
    //  4. BACK
    // =================================================================
    mk("spine", new THREE.BoxGeometry(0.05,0.48,0.05), [0,0.68,-0.18], [0,0.22,-0.50], {c:C.met, chr:true});
    mk("back-upper", new THREE.BoxGeometry(0.46,0.22,0.07), [0,0.84,-0.20], [0,0.38,-0.58], {c:C.red});
    mk("back-lower", new THREE.BoxGeometry(0.40,0.18,0.07), [0,0.56,-0.18], [0,0.06,-0.52], {c:C.dk});
    mk("thruster-pack", new THREE.BoxGeometry(0.34,0.28,0.10), [0,0.72,-0.28], [0,0.30,-0.80], {c:C.met, chr:true});
    mk("nozzle-l", new THREE.CylinderGeometry(0.05,0.08,0.14,14), [-0.10,0.56,-0.36], [-0.22,0.12,-0.88], {r:[Math.PI*0.45,0,0], chr:true, c:C.gl, ec:C.glH, ei:0.9});
    mk("nozzle-r", new THREE.CylinderGeometry(0.05,0.08,0.14,14), [0.10,0.56,-0.36], [0.22,0.12,-0.88], {r:[Math.PI*0.45,0,0], chr:true, c:C.gl, ec:C.glH, ei:0.9});
    mk("back-flap-l", new THREE.BoxGeometry(0.18,0.36,0.02), [-0.20,0.74,-0.24], [-0.48,0.42,-0.66], {r:[0,-Math.PI/10,0], c:C.red});
    mk("back-flap-r", new THREE.BoxGeometry(0.18,0.36,0.02), [0.20,0.74,-0.24], [0.48,0.42,-0.66], {r:[0,Math.PI/10,0], c:C.red});
    mk("flap-acc-l", new THREE.BoxGeometry(0.03,0.26,0.015), [-0.20,0.74,-0.22], [-0.48,0.42,-0.62], {r:[0,-Math.PI/10,0], c:C.gold});
    mk("flap-acc-r", new THREE.BoxGeometry(0.03,0.26,0.015), [0.20,0.74,-0.22], [0.48,0.42,-0.62], {r:[0,Math.PI/10,0], c:C.gold});
    mk("tail-fin", new THREE.BoxGeometry(0.06,0.14,0.02), [0,0.50,-0.32], [0,0.04,-0.76], {c:C.dk});

    return suit;
}
