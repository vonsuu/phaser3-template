export default class WorldGenerator {

    private width: number;
    private height: number;
    private scene: any;
    private jsonMapData: any;

    constructor(scene: any) {
        this.width = Math.floor((Math.random() * 100) + 4);
        this.height = Math.floor((Math.random() * 100) + 4);
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
        let layerData = [];
        let i,j;
        for (i = 0; i < this.height; i++) {
            for (j=0; j<this.width; j++) {
              // top-left
              if (i == 0 && j == 0) {
                layerData.push(21);
              } 
              // top
              else if (i==0 && j!=0 && j!=(this.width-1)) {
                layerData.push(22);
              } 
              // top-right
              else if (i==0 && j==(this.width-1)) {
                layerData.push(23)
              }
              // right
              else if (i!=0 && j==(this.width-1) && i!=(this.height-1)) {
                layerData.push(33);
              }
              // left 
              else if (i!=0 && j==0 && i!=(this.height-1)) {
                layerData.push(31);
              }
              // left-down
              else if (i==(this.height-1) && j==0) {
                layerData.push(41);
              }
              // down
              else if (i==(this.height-1) && j!=0 && j!=(this.width-1)) {
                layerData.push(22);
              }
              // down-right
              else if (i==(this.height-1) && j==(this.width-1)) {
                layerData.push(43);
              }
              else {
                layerData.push(82);
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