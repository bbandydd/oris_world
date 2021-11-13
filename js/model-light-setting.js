AFRAME.registerComponent("model-light-setting", {
  schema: {
    color: { default: "white" },
    intensity: { default: "0.5" },
  },
  init: function () {
    var el = this.el;
    var modelLightEl = document.createElement("a-entity");
    modelLightEl.id = "TempLight";

    modelLightEl.setAttribute("light", {
      type: "point",
      intensity: 30,
      color: "red",
      distance: "0",
    });

    // this.el.appendChild(modelLightEl);

    modelLightEl.setAttribute("position", "0 0.025 0");
    modelLightEl.setAttribute("scale", "1 1 1");
    modelLightEl.setAttribute("visible", "true");
    this.el.appendChild(modelLightEl);
  },
});
