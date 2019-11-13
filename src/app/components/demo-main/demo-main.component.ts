import { Component, OnInit } from '@angular/core';
import * as Cesium from 'cesium';
@Component({
  selector: 'app-demo-main',
  templateUrl: './demo-main.component.html',
  styleUrls: ['./demo-main.component.css']
})
export class DemoMainComponent implements OnInit {
  viewer = new Cesium.Viewer('cesiumContainer', {
    animation: false,//是否创建动画小器件，左下角仪表
    baseLayerPicker: false,//是否显示图层选择器
    fullscreenButton: false,//是否显示全屏按钮
    geocoder: false,//是否显示geocoder小器件，右上角查询按钮
    homeButton: false,//是否显示Home按钮
    infoBox: true,//是否显示信息框
    sceneModePicker: false,//是否显示3D/2D选择器
    selectionIndicator: false,//是否显示选取指示器组件
    timeline: false,//是否显示时间轴
    navigationHelpButton: false,//是否显示右上角的帮助按钮
    scene3DOnly: true,//如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    clock: new Cesium.Clock(),//用于控制当前时间的时钟对象
  });
  // .imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({ // 增加谷歌影像底图
  //   url: 'http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}',
  //   tilingScheme: new Cesium.WebMercatorTilingScheme()
  // })
  // );
  czml = [{
    "id": "document",
    "name": "CZML Geometries: Polyline",
    "version": "1.0"
  }, {
    "id": "redLine",
    "name": "Red line clamped to terain",
    "polyline": {
      "positions": {
        "cartographicDegrees": [
          -75, 35, 0,
          -125, 35, 0
        ]
      },
      "material": {
        "solidColor": {
          "color": {
            "rgba": [255, 0, 0, 255]
          }
        }
      },
      "width": 5,
      "clampToGround": true
    }
  },
  //  {
  //   "id": "blueLine",
  //   "name": "Glowing blue line on the surface",
  //   "polyline": {
  //     "positions": {
  //       "cartographicDegrees": [
  //         -75, 37, 0,
  //         -125, 37, 0
  //       ]
  //     },
  //     "material": {
  //       "polylineGlow": {
  //         "color": {
  //           "rgba": [100, 149, 237, 255]
  //         },
  //         "glowPower": 0.2,
  //         "taperPower": 0.5
  //       }
  //     },
  //     "width": 10
  //   }
  // },
  {
    "id": "orangeLine",
    "name": "Orange line with black outline at height and following the surface",
    "polyline": {
      "positions": {
        "cartographicDegrees": [
          -75, 70, 0,
          -125, 35, 0
        ]
      },
      "material": {
        "polylineOutline": {
          "color": {
            "rgba": [255, 165, 0, 255]
          },
          "outlineColor": {
            "rgba": [0, 0, 0, 255]
          },
          "outlineWidth": 2
        }
      },
      "width": 5
    }
  },


    //  {
    //   "id": "purpleLine",
    //   "name": "Purple arrow at height",
    //   "polyline": {
    //     "positions": {
    //       "cartographicDegrees": [
    //         -75, 43, 500000,
    //         -125, 43, 500000
    //       ]
    //     },
    //     "material": {
    //       "polylineArrow": {
    //         "color": {
    //           "rgba": [148, 0, 211, 255]
    //         }
    //       }
    //     },
    //     "arcType": "NONE",
    //     "width": 10
    //   }
    // }, {
    //   "id": "dashedLine",
    //   "name": "Blue dashed line",
    //   "polyline": {
    //     "positions": {
    //       "cartographicDegrees": [
    //         -75, 45, 500000,
    //         -125, 45, 500000
    //       ]
    //     },
    //     "material": {
    //       "polylineDash": {
    //         "color": {
    //           "rgba": [0, 255, 255, 255]
    //         }
    //       }
    //     },
    //     "width": 4
    //   }
    // }
  ];
  // entity = new Cesium.Entity('cesiumContainer');
  infoBox = new Cesium.InfoBox('cesiumContainer');
  constructor() { }

  ngOnInit() {

    this.viewer._cesiumWidget._creditContainer.style.display = 'none';
    // Load Cesium World Terrain
    this.viewer.terrainProvider = Cesium.createWorldTerrain({
      requestWaterMask: true, // required for water effects
      requestVertexNormals: true // required for terrain lighting
    });
    // this.viewer.scene.backgroundColor = new Cesium.Color('#5F9EA0');
    this.viewer.dataSources.add(Cesium.CzmlDataSource.load(this.czml));
    // const dataSourcePromise = Cesium.CzmlDataSource.load(this.czml);
    // this.viewer.dataSources.add(dataSourcePromise);
    // this.viewer.zoomTo(dataSourcePromise);
    // 删除默认的影像图层
    // this.viewer.imageryLayers.remove(this.viewer.imageryLayers.get(0));

    const pinBuilder = new Cesium.PinBuilder();
    const bluePin = this.viewer.entities.add({
      name: '目的地',
      label: undefined,
      position: Cesium.Cartesian3.fromDegrees(-75, 70),
      description: '<table class="cesium-infoBox-defaultTable cesium-infoBox-defaultTable-lighter"><tbody>' +
        '<tr><th>' + "航班：" + '</th><td>' + 'H666' + '</td></tr>' +
        '<tr><th>' + "时间：" + '</th><td>' + '2019-11-14 19:21:00' + '</td></tr>' +
        '</tbody></table>',
      billboard: {
        image: pinBuilder.fromColor(Cesium.Color.ROYALBLUE, 48).toDataURL(),
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
      }
    });
    const blackPin = this.viewer.entities.add({
      name: '起飞机场',
      label: undefined,
      position: Cesium.Cartesian3.fromDegrees(-75, 35),
      description: '<table class="cesium-infoBox-defaultTable cesium-infoBox-defaultTable-lighter"><tbody>' +
        '<tr><th>' + "航班：" + '</th><td>' + 'G2221' + '</td></tr>' +
        '<tr><th>' + "时间：" + '</th><td>' + '2019-11-13 09:21:00' + '</td></tr>' +
        '</tbody></table>',
      billboard: {
        image: pinBuilder.fromColor(Cesium.Color.BLACK, 48).toDataURL(),
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
      }
    });
    const redPin = this.viewer.entities.add({
      name: '中途转场',
      label: undefined,
      position: Cesium.Cartesian3.fromDegrees(-125, 35),
      description: '<table class="cesium-infoBox-defaultTable cesium-infoBox-defaultTable-lighter"><tbody>' +
        '<tr><th>' + "起始航班：" + '</th><td>' + 'G2221' + '</td></tr>' +
        '<tr><th>' + "转场航班" + '</th><td>' + 'H666' + '</td></tr>' +
        '</tbody></table>',
      billboard: {
        image: pinBuilder.fromColor(Cesium.Color.RED, 48).toDataURL(),
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
      }
    });
    Cesium.when.all([bluePin, blackPin, redPin], function (pins) {
      this.viewer.zoomTo(pins);
    });
    const description = '<table class="cesium-infoBox-defaultTable cesium-infoBox-defaultTable-lighter"><tbody>' +
      '<tr><th>' + "经度" + '</th><td>' + 222 + '</td></tr>' +
      '<tr><th>' + "纬度" + '</th><td>' + 333 + '</td></tr>' +
      '</tbody></table>';
  }
}
