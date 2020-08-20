import MarkerClusterer from "@google/markerclustererplus";
import "../styles/GoogleMap.scss";
import { City, Location } from "../types";

class Cluster {
  private static markerClusterer: MarkerClusterer;

  constructor(obj: any) {
    Object.assign(this, obj);
  }

  static setMarkerCluster(data: City[], map: any, maps: any) {
    const markerStyles = [
      {
        width: 35,
        height: 35,
        className: "cluster-icon",
      },
      {
        width: 45,
        height: 45,
        className: "cluster-icon",
      },
      {
        width: 55,
        height: 55,
        className: "cluster-icon",
      },
    ];

    const mapMarkers = data.map((city: City): any => {
      const location = { lat: city.lat, lng: city.lng };
      const marker = new maps.Marker({
        position: location,
        visible: false,
      });

      return marker;
    });

    this.markerClusterer = new MarkerClusterer(map, mapMarkers, {
      styles: markerStyles,
      clusterClass: "cluster-icon",
    });
  }

  static getMarkerClusterer(): MarkerClusterer {
    return this.markerClusterer;
  }

  static getMarkersInView(): Location[] {
    if (!this.markerClusterer) {
      return new Array<Location>();
    }

    const singleClusters = this.markerClusterer
      .getClusters()
      .map((cluster) => cluster.getMarkers())
      .filter((group) => group.length === 1);

    const locations: any[] = [];
    singleClusters.forEach((cluster) => {
      const loc = cluster.map((marker: any) => ({
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng(),
      }));
      locations.push(loc[0]);
    });
    return locations;
  }
}

export default Cluster;
