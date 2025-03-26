import { h, iconEye, iconHome } from "/js/src/index.js";

const homeButton = (model) =>
  h(
    "button",
    {
      title: "Home",
      onclick: () => {
        console.log("go to home page"), model.router.go("?page=home");
      },
    },
    iconHome()
  );

const infoButton = (model) =>
  h(
    "button",
    {
      onclick: () => {
        console.log("request data about app"), model.about.getDetails(), window.alert("requesting data");
      },
    },
    iconEye()
  );

const table = (model) => [
  h("h2", `requested ${model.about.getRequestedTimes()} times`),
  h("table", [
    h("tr", [h("th", "Key"), h("th", "Value")]),
    Object.entries(model.about.getDetailsWithoutRequest()).map(([key, value]) =>
      h("tr", [h("td", key), h("td", value)])
    ),
  ]),
];

const content = (model) => h("", [h("h1", "About content"), homeButton(model), infoButton(model), table(model)]);

export default content;
