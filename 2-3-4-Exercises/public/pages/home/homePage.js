import { h, iconPerson, info } from "/js/src/index.js";

const content = (model) =>
  h("", [
    h("h1", "Home content"),
    h(
      "button",
      {
        title: "About",
        onclick: () => {
          console.log("go to about page"), model.router.go("?page=about");
        },
      },
      info()
    ),
    h(
      "button",
      {
        onclick: () => {
          console.log("get the username"), window.alert("username: " + model.home.getUserName());
        },
      },
      iconPerson()
    ),
    h(
      "button",
      {
        onclick: () => {
          console.log("set the username"), model.home.setUserName("username");
        },
      },
      "Set username"
    ),
    h("label", model.home.getUserName()),
  ]);

export default content;
