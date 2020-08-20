import React from "react";
import "../styles/GoogleMap.scss";
import { City } from "../types";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

type CityMarkerProps = { city: City; lat: number; lng: number };

const CityTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 350,
    fontSize: theme.typography.pxToRem(12),
  },
}))(Tooltip);

const CityMarker = (props: CityMarkerProps) => {
  const getHoverInfo = () => {
    return (
      <>
        <Typography color="inherit">Country: {props.city.country}</Typography>
        <Typography color="inherit">
          Location: {`(${props.city.lat}, ${props.city.lng})`}
        </Typography>
        <Typography color="inherit">
          Population:{" "}
          {props.city.population
            ? props.city.population.toLocaleString()
            : "Unknown"}
        </Typography>
        {props.city.capital ? (
          <Typography color="inherit">Capital City</Typography>
        ) : null}
      </>
    );
  };

  return (
    <CityTooltip title={getHoverInfo()}>
      <div className="city-marker">{props.city.city}</div>
    </CityTooltip>
  );
};

export default CityMarker;
