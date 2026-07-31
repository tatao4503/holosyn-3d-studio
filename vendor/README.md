# Bundled Runtime Assets

These files are stored locally so HOLOSYN can run from its localhost launcher
without an internet connection.

| Package | Version | Source path | License |
|---|---:|---|---|
| three.js and examples | r128 / 0.128.0 | `vendor/three` | MIT |
| Lucide | 1.27.0 | `vendor/lucide` | ISC |
| PeerJS | 1.4.7 | `vendor/peerjs` | MIT |
| qrcode-generator | 1.4.4 | `vendor/qrcode` | MIT |
| Inter | v20 files | `vendor/fonts` | SIL OFL 1.1 |
| Outfit | v15 files | `vendor/fonts` | SIL OFL 1.1 |
| Share Tech Mono | v16 file | `vendor/fonts` | SIL OFL 1.1 |

License texts are in `vendor/licenses`. PeerJS is bundled so the interface can
load offline, but real-time collaboration still requires network connectivity
to its signaling and peer endpoints.
