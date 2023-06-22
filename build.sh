PATH=$PATH:/opt/buildhome/.foundry/bin
export PATH
curl -L https://foundry.paradigm.xyz | bash
foundryup
npm run build