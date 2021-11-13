/* global AFRAME */
AFRAME.registerComponent("lamps-menu", {
  schema: {},
  init: function () {
    var sceneEl = this.el.sceneEl;
    var containerEl = (this.containerEl = document.createElement("div"));
    containerEl.classList.add("lamps-container");

    this.toggleLampsList = this.toggleLampsList.bind(this);
    this.closeLampsList = this.closeLampsList.bind(this);
    this.onClickLamps = this.onClickLamps.bind(this);

    var navEl = document.createElement("div");
    navEl.classList.add("lamps-nav");

    var filterListEl = document.createElement("div");
    var filterEl = document.createElement("div");
    filterEl.classList.add("filter");
    filterEl.innerText = "全部";

    filterListEl.appendChild(filterEl);

    var closeButtonEl = (this.closeButtonEl = document.createElement("div"));
    closeButtonEl.classList.add("close-button");
    closeButtonEl.onclick = this.closeLampsList;

    navEl.appendChild(filterEl);
    navEl.appendChild(closeButtonEl);

    var lampsListEl = document.createElement("div");
    lampsListEl.classList.add("lamps-list");

    const DATA = [
      {
        model:
          "https://s3.us-east-2.amazonaws.com/rooster.thebarkingdog.tw/model/Light1.glb",
        image:
          "https://s3.us-east-2.amazonaws.com/rooster.thebarkingdog.tw/model/temp1.png",
        title: "title11",
        content: "content1111",
      },
      {
        model:
          "https://s3.us-east-2.amazonaws.com/rooster.thebarkingdog.tw/model/Light2.glb",
        image:
          "https://s3.us-east-2.amazonaws.com/rooster.thebarkingdog.tw/model/temp2.png",
        title: "title22",
        content: "content2222",
      },
      {
        model:
          "https://s3.us-east-2.amazonaws.com/rooster.thebarkingdog.tw/model/Light3.glb",
        image:
          "https://s3.us-east-2.amazonaws.com/rooster.thebarkingdog.tw/model/temp1.png",
        title: "title33",
        content: "content3333",
      },
    ];
    DATA.forEach(function (obj) {
      var lampsEl = document.createElement("div");
      lampsEl.classList.add("lamps");
      lampsEl.onclick = function () {
        this.onClickLamps(obj);
      }.bind(this);

      var lampsImageEl = document.createElement("img");
      lampsImageEl.src = obj.image;
      lampsEl.appendChild(lampsImageEl);

      lampsListEl.appendChild(lampsEl);
    }, this);

    this.createLampsButton(this.toggleLampsList);

    this.addStyles();

    containerEl.appendChild(navEl);
    containerEl.appendChild(lampsListEl);
    sceneEl.appendChild(containerEl);
  },

  update: function () {},
  onClickLamps: function (obj) {
    $("#messageText").html(`
      <p>${obj.title}</p>
      <p>${obj.content}</p>
    `);

    // force update
    $("[info-message]")[0].components["info-message"].update();
    $("[model-viewer]")[0].components["model-viewer"].modelEl.setAttribute(
      "gltf-model",
      obj.model
    );
  },
  closeLampsList: function () {
    $(this.containerEl).animate(
      {
        bottom: "-1000px",
      },
      400
    );
  },
  addStyles: function () {
    var css =
      ".lamps-container { position: absolute; bottom: -1000px; width: calc(100vw - 20px); height: 130px; background: #FFFFFF; border: 1px solid #ccc; border-top-left-radius: 30px; border-top-right-radius: 30px; padding: 10px; z-index: 10000;}" +
      ".lamps-nav { position: relative; width: 100%; display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; padding: 0 5px; }" +
      ".filter { background: #734D46; width: 50px; height: 20px; border-radius: 30px; color: #FFFFFF; padding: 10px 20px; display: flex; align-items: center; justify-content: center; }" +
      ".close-button { cursor: pointer; }" +
      '.close-button:after { position: absolute; top: -20px; right: 10px; display: inline-block; content: "\\00d7"; font-size: 3rem; color: #FFFFFF; text-shadow: 0em 0em 0.05em #333; }' +
      ".lamps-list { display: flex; width: 100%; height: 100%; overflow: auto; padding: 5px 10px 0 5px; }" +
      ".lamps { display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; border-radius: 15px; box-shadow: rgba(0,0,0,0.8) 0 0 5px; flex-shrink: 0; margin-right: 10px; }" +
      ".lamps img { max-width: 100%; max-height: 100%; display: block; }" +
      ".a-lamps-menu-container {position: absolute; left: 190px; bottom: 20px;}" +
      // '.a-lamps-menu-button {background: rgba(0, 0, 0, 0.35) ' + this.infoMessageButtonDataURI + ' 50% 50% no-repeat;}' +
      ".a-lamps-menu-button {background-size: 92% 90%; padding: 0; border: 3px solid #aaaaaa; color: #aaaaaa; font-size: 16px; font-weight: bolder; bottom: 0; cursor: pointer; min-width: 78px; min-height: 34px; padding-right: 0; padding-top: 0; position: absolute; right: 0; transition: background-color .05s ease; -webkit-transition: background-color .05s ease; z-index: 9999; border-radius: 8px; touch-action: manipulation;}" +
      ".a-lamps-menu-button:active, .a-lamps-menu-button:hover {background-color: #ef2d5e;}";
    var style = document.createElement("style");

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName("head")[0].appendChild(style);
  },

  toggleLampsList: function () {
    $(this.containerEl).animate(
      {
        bottom: "0px",
      },
      400
    );
  },

  createLampsButton: function (onClick) {
    var lampsButton;
    var wrapper;

    // Create elements.
    wrapper = document.createElement("div");
    wrapper.classList.add("a-lamps-menu-container");
    this.lampsButton = lampsButton = document.createElement("button");
    lampsButton.className = "a-lamps-menu-button";
    lampsButton.textContent = "燈具列表";
    // Insert elements.
    wrapper.appendChild(lampsButton);
    lampsButton.addEventListener("click", function (evt) {
      onClick();
      evt.stopPropagation();
    });
    this.el.sceneEl.appendChild(wrapper);
  },

  // infoMessageButtonDataURI: 'url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMyIgZGF0YS1uYW1lPSJMYXllciAzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iNjIiIHZpZXdCb3g9IjAgMCAxNTAgNjIiPjxwYXRoIGQ9Ik0xMzgsMEgxMkExMi4wMzUsMTIuMDM1LDAsMCwwLDAsMTJWNTBBMTIuMDM1LDEyLjAzNSwwLDAsMCwxMiw2MkgxMzhhMTIuMDM1LDEyLjAzNSwwLDAsMCwxMi0xMlYxMkExMi4wMzUsMTIuMDM1LDAsMCwwLDEzOCwwWk0zNi4yMTIsNDYuMDQzSDI5di0zMGg3LjIxMlptMzAuODQzLDBINTkuODY0TDQ5LjIzMiwyNy4zNzVWNDYuMDQzSDQydi0zMGg3LjIzMkw1OS44NDMsMzQuNzExVjE2LjA0M2g3LjIxMlpNOTMuMDcsMjEuNjI3SDgwLjIzNHY2LjlIOTEuOXY1LjU2M0g4MC4yMzRWNDYuMDQzSDczdi0zMEg5My4wN1pNMTIzLjQsMzEuNjY1YTE3LjgsMTcuOCwwLDAsMS0xLjYzNyw3LjgxMiwxMi4xMDgsMTIuMTA4LDAsMCwxLTQuNjUyLDUuMjMyLDEyLjk1MSwxMi45NTEsMCwwLDEtNi44NywxLjgzNCwxMy4xMzgsMTMuMTM4LDAsMCwxLTYuODM4LTEuNzcyLDEyLjA4MSwxMi4wODEsMCwwLDEtNC42NTItNS4wNjZBMTcuMjgxLDE3LjI4MSwwLDAsMSw5NywzMi4xNDF2LTEuN2ExNy44NTksMTcuODU5LDAsMCwxLDEuNjI3LTcuODIyLDEyLjA2NywxMi4wNjcsMCwwLDEsNC42NjItNS4yMzMsMTMuOCwxMy44LDAsMCwxLDEzLjc0OS0uMDIxLDEyLjI4OSwxMi4yODksMCwwLDEsNC42NzMsNS4xOTEsMTcuMzYyLDE3LjM2MiwwLDAsMSwxLjY4OSw3LjcxOVoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTEwLjIsMjEuMjQxcS01LjQ3MSwwLTUuNzgyLDguMjA2bC0uMDIsMi4yMThhMTMuMDQ3LDEzLjA0NywwLDAsMCwxLjQ3MSw2LjgxNyw0LjgxMSw0LjgxMSwwLDAsMCw0LjM3MiwyLjM4Myw0Ljc1Miw0Ljc1MiwwLDAsMCw0LjI0OC0yLjM0MUExMi42OTEsMTIuNjkxLDAsMCwwLDExNiwzMS43ODlWMzAuNHEwLTQuNS0xLjUtNi44MjhBNC44MjEsNC44MjEsMCwwLDAsMTEwLjIsMjEuMjQxWiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==)'
});
