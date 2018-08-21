export default class WorldGenerator {

    private width: number;
    private height: number;
    private scene: any;
    private jsonMapData: any;

    constructor(scene: any) {
        this.width = Math.floor((Math.random() * 20) + 10);
        this.height = Math.floor((Math.random() * 20) + 10);
        this.scene = scene;
        this.jsonMapData = scene.cache.tilemap.get('Level1Map').data;
    }

    generateMap(): Phaser.Tilemaps.Tilemap  {
        let levelLayer = {
            "data": this.createLevelLayer(),
            "name": "tileLayer",
            "type": "tilelayer",
            "visible": true,
            "opacity": 1,
            "width": this.width,
            "height": this.height,
            "x":0,
            "y":0
        };

        this.jsonMapData.layers.push(levelLayer);

        return this.convertJsonMapDataToTileMap();
    }

    private createLevelLayer(): any {
      const boundries = this.generateBoundries(); 
      let rects = Math.floor((Math.random() * 7) + 1);
      let layerData = this.generateRectangleOnLayer(boundries);
      for(let i=0; i<rects; i++) {
        layerData = this.generateRectangleOnLayer(layerData);
      }
      return this.translate2dTo1d(layerData);
    }

    private generateRectangleOnLayer(boundries: number[][]): any {
      let width = Math.floor((Math.random() * 6) + 2);
      let height = Math.floor((Math.random() * 6) + 2);
      const rect: number[][] = this.createRectangle(width,height);
      
      let offsetX = Math.floor((Math.random() * this.width-4) + 2);
      let offsetY = Math.floor((Math.random() * this.height-4) + 2);

      const layerData = this.mergeLayers(boundries, rect, offsetX, offsetY);
      
      return layerData;
    }

    private generateBoundries(): any {
      return this.createRectangle(this.width, this.height);
    }

    private mergeLayers(layer1: number[][], layer2: number[][], 
      offsetX: number, offsetY: number): number[][] {
      if (offsetY+layer2.length > layer1.length) {
        return layer1;
      }

      if (offsetX+layer2[0].length > layer1[0].length) {
        return layer1;
      }

      let i,j;

      let len = layer1.length;
      let finalLayer:number[][] = new Array(len); // boost in Safari 
      for (i=0; i<len; ++i)
        finalLayer[i] = layer1[i].slice(0);
      
      for (i=0; i<layer2.length; i++) {
        for (j=0; j<layer2[i].length; j++) {
          finalLayer[i+offsetY][j+offsetX] = layer2[i][j]; 
        }
      }
      return finalLayer;
    }

    private translate2dTo1d(array2d: number[][]): number[] {
      let array1d:number[] = [];
      let i,j;
      let size2 = array2d[0].length
      for (i = 0; i<array2d.length; i++) {
          for (j=0; j<size2; j++) {
            array1d.push(array2d[i][j]);
          }
      }
      return array1d;
    }

    private createRectangle(width: number, height: number): number[][] {
      let layerData:number[][] = [];
      let i,j;
      for (i = 0; i<height; i++) {
          layerData[i] = [];
          for (j=0; j<width; j++) {
            // top-left
            if (i == 0 && j == 0) {
              layerData[i][j] = 21;
            } 
            // top
            else if (i==0 && j!=0 && j!=(width-1)) {
              layerData[i][j] = 22;
            } 
            // top-right
            else if (i==0 && j==(width-1)) {
              layerData[i][j] = 23;
            }
            // right
            else if (j==(width-1) && i!=0 && i!=(height-1)) {
              layerData[i][j] = 33;
            }
            // left 
            else if (i!=0 && j==0 && i!=(height-1)) {
              layerData[i][j] = 31;
            }
            // left-down
            else if (i==(height-1) && j==0) {
              layerData[i][j] = 41;
            }
            // down
            else if (i==(height-1) && j!=0 && j!=(width-1)) {
              layerData[i][j] = 22;
            }
            // down-right
            else if (i==(height-1) && j==(width-1)) {
              layerData[i][j] = 43;
            }
            else {
              layerData[i][j] = 82;
            }
          }
      } 
      return layerData;
    }

    private convertJsonMapDataToTileMap(): Phaser.Tilemaps.Tilemap {
        
        let mapData = Phaser.Tilemaps.Parsers.Parse(
            null, 
            Phaser.Tilemaps.Formats.TILED_JSON, 
            this.jsonMapData, 
            16, // tileWidth 
            16, // tileHeight 
            false
        );
  
        if (mapData === null) {
            console.warn("WorldGenerator: parseToTileMap: mapData is null");
        }

        return new Phaser.Tilemaps.Tilemap(this.scene, mapData);
    }
  
}