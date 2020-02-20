console.log("Site Loaded");

setTimeout(function(){
  document.body.querySelector("p").innerText = "This is an "+(navigator.onLine ? 'Online' : 'Offline')+ " Version of the Site.";
});
