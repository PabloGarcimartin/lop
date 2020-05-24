
let currentNetwork= "mainnet";

const to = "0x33efbb5233f082bd3d6fbff727569117f0e4b048";
const amount = 12;

let networks = `
    <a class="dropdown-item network" title="mainnet">
      mainnet - Ethereum main network
    </a>
    <a class="dropdown-item network" title="ropsten">
      ropsten - Ethereum ropsten network
    </a>
    <a class="dropdown-item network" title="rinkeby">
      rinkeby - Ethereum rinkeby network
    </a>
    <a class="dropdown-item network" title="goerli">
      goerli - Ethereum goerli network
    </a>
    <a class="dropdown-item network" title="ubiq">
      ubiq - ubiq main network
    </a>
    <a class="dropdown-item network" title="thundercoreTestnet">
      thundercoreTestnet - thundercore test network
    </a>
    <a class="dropdown-item network" title="orchid">
      orchid - RootStock main network
    </a>
    <a class="dropdown-item network" title="orchidTestnet">
      orchidTestnet - RootStock test network
    </a>
    <a class="dropdown-item network" title="kovan">
      kovan - Ethereum kovan network
    </a>
    <a class="dropdown-item network" title="classic">
      classic - Ethereum Classic main network
    </a>
    <a class="dropdown-item network" title="sokol">
      sokol - POA test network
    </a>
    <a class="dropdown-item network" title="core">
      core - POA main network
    </a>
    <a class="dropdown-item network" title="xdai">
      xdai - xDai main network
    </a>
    <a class="dropdown-item network" title="thundercore">
      thundercore - thundercore main network
    </a>
    <a class="dropdown-item network" title="fuse">
      fuse - fuse main network
    </a>
    <a class="dropdown-item network" title="lightstreams">
      lightstreams - lightstreams main network
    </a>
    <a class="dropdown-item network" title="maticAlpha">
      maticAlpha - matic alpha network
    </a>
    <a class="dropdown-item network" title="maticTestnet">
      maticTestnet - matic test network
    </a> `;

let networksList = document.getElementById('networksList');
networksList.innerHTML = networks;

let netList = document.getElementsByClassName('network');

for(let el of netList) {
  el.addEventListener("click", function() {
      const currentNetwork = this.title;
      console.log(currentNetwork);
      document.getElementById('currentNetwork').innerHTML = currentNetwork;
      portis.changeNetwork(currentNetwork);
  }, false);
}

async function send() {

  web3.eth.getAccounts((error, accounts) => {
    const acc = accounts;
    web3.currentProvider.sendAsync(
      {
        id: 42,
        method: "eth_sendTransaction",
        params: [
          {
            id: 1548504580559614,
            from: acc[0],
            to: to,
            value: convertToHexWei(amount)
          }
        ]
      },
      (error, response) => {
        console.log(error, response);
      }
    );
  });
}

function convertToHexWei(value) {
  const wei = value * 10 ** 18;
  const hexWei = wei.toString(16);
  return `0x${hexWei}`;
}
