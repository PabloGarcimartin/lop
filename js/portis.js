
const portis = new Portis('e5db955b-2f47-44bb-8f93-2bee14739d57', 'mainnet');
const web3 = new Web3(portis.provider);

let cuenta = '';


//Jugador inicia sesión
portis.onLogin(walletAddress => {
  console.log("User logged in");
  console.log('Wallet address: '+ walletAddress);

   //Show logout button
   var logoutBtn = document.getElementById("logout");
   logoutBtn.style.display = "block";
});

portis.onLogout(() => {
  console.log("User logged out");
  document.getElementById("app").innerHTML = ``;

  //Hide logout button
  let logoutBtn = document.getElementById("logout");
  logoutBtn.style.display = "none";
});

document.getElementById("login").onclick = () => {
  let acc = portis.showPortis();
  console.log(acc);
}
document.getElementById("logout").onclick = () => {
  portis.isLoggedIn().then(({ error, result }) => {
    if (result) {
      console.log("Logging out user");
      portis.logout();
    } else if (error) {
      console.log(error);
    } else {
      console.log("User is already logged out!");
    }
  });
};

//Control de errores
portis.onError(error => {
  console.log('error', error);
});
