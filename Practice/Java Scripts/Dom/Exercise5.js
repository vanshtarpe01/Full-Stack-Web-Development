// Render a product list from an array.
let ol = document.createElement("ol");
let product = ["Mobile", "Laptop", "Mouse", "Keyboard", "Monitor", "CPU", "PS5"];
for(let products of product){
    // console.log(products);
    let li = document.createElement("li");
    li.innerText = products;
    ol.append(li);
}

document.body.prepend(ol);

// Display user profile data in HTML.
let profileCard = document.createElement("div");
profileCard.classList.add("profile-card");
let profileImage = document.createElement("img");
profileImage.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALwAAACUCAMAAAAeaLPCAAAAQlBMVEX6+vqPj4////+Li4vx8fGioqKIiIiAgICnp6fs7Oz39/eDg4P09PTHx8fLy8vb29u0tLTT09Pl5eWYmJitra2+vr74UUVkAAAD+0lEQVR4nO2c3XKkIBBGtRsQ/ENE3/9VF8dJMpuNoxCFdotzkVQlNyekwQa+sSgymUwmk8lkMplM5j8DHqS28Mc5MzWOehxH1RZ3+gsAWt0NE7e2LK3l09zp+ib+AOPMLQrE8gEKgZbP6gb6Tp3jh/cX7gdyJG8/8uq7+AeVVKnt3gFsFv8M+svwY9eSHX3QXGyrL4iJau2AKXfcnb3VJO2d+5uS+SydkqI99LvD/sSQswdz1B2R2tjDeFB9sbeKln1tD9T7B4KTkofhaNGs9jMhe9A+6guElvuWexTNAsrUyp9A7+nuILPiMOktL4Y6tfUKaK/Z+mRMrf3Eb6l5Dn2X2nql9a94hyVRN2A2tx/vqEisljCFlDyRBxWEqLulnkaPEFQ1bugJyIMKlK8IzFgwTZh8Q2DGHt9BfZcn0CHAHCpPYDsYLC/uLE9i5G9d87debcZA+Yqlly/qwIdUQ8C9gMCatyTkfXffK0S6yrAZS6OfL1hY3RDoyxb8Dw+W44PU1ivHD4hf5XVq7RVQ/lMWJUut/QQ676FHAo3Niv/Qo2xTS3/if1hJZuAX/IZeTJTcgXk1OILIGv/E69iMyMP1C48Vh8L+7xv1fLDskcj58F+0xzazoqNV8E/q7kDdVya15gauOd4pHSGozdUvlkft27yNpJu3cfZFb7f0EbkhnjMDNnPxw8wVyDsKxwXvAVBmKpvXuBaKphwMsbTEBgCtMoNtqqpxuK/Wmde3UP+kVlobo0dVL3PhbgDcNUycyWRIAUXLTqBNsI4C0/Mg+a+RQ6cjd2sARrr+Fk/ANUIy6u0UtMOR3PBRRDnHqx1ge1Fzb/14kbNaBt6hbdPEOvGG7nT3eFfKgTchO2AU9+D7+vc0fYyhB3uFe1nGiG35JOW9wAh3JWAuko+R7IbuKvkIz9nr5CMsljcf+RO7mujyAUl/OvK3Xm28P9xylBjngeoq+Sj3yhe5R0k+QUhCZR8cosj3F7TzZVnF2cj63XYfpYmhvvTEF9QNyjg7qUvqJlLVFEV7/nYEebTjg9Ds8zYi3rkTC8uBboNTvOTT+f1N1AO/4dShxzmiegGn9ggiciYaivPmLJaxT+hhPOucOMWbBECf86BFniLFAqM9oXQET/ORZGDy1y1aNSRL4MC8F216Dyb9rBQoGT5vsZzSJnCgMPzdm5C2ESjTB5+A9fKnaNO+OoW8GQDTU+PT4mMjBk0os8W6sjo2ebGpbE8nPb8AAG3PF7ftbOL6G2lIvgoPoNbzwLl9vPJOvF5yL3PaPq7qCb+E0P0DaqVNPw/DNMlHNEHKaRrmuTejKm6Q2VpzZS1TTDnct7a4Y9bshsqZTCaTyWQymUwms88fqNsyIPDaIpkAAAAASUVORK5CYII=");
profileImage.setAttribute("alt", "User Profile");
profileImage.classList.add("profile-card-img");
let userName = document.createElement("h3");
userName.innerText = "Vansh Tarpe";
userName.classList.add("profile-card-h3");
let rollNo = document.createElement("p");
rollNo.innerText = "MLU25S211";
rollNo.classList.add("profile-card-p");
let userAge = document.createElement("p");
userAge.innerText = "19";
userAge.classList.add("profile-card-p");

profileCard.append(profileImage);
profileCard.append(userName);
profileCard.append(rollNo);
profileCard.append(userAge);
document.body.append(profileCard);
