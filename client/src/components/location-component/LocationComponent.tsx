import { Box, Flex, Grid } from "@radix-ui/themes";
import water from "../../assets/icons/c-water.png";
import triangle from "../../assets/icons/loc-triang.png";
import deploy from "../../assets/icons/b-deploy.png";
import "./LocationComponent.scss";
import { Location, Resource, ResourceEnum } from "../../store";
import React from "react";


export const LocationComponent = ({location, resources, onSelect} : {location: Location; resources: Resource[], onSelect: (callback: () => void) => void;}) => {

    const [alreadySelected, setAlreadySelected] = React.useState(false);

    const hasEnoughResources = () => {
        return resources.find(res => res.type == location.cost.resource.type && res.amount >= location.cost.resource.amount)
    }

    return (
        <Box mb="20px">
              <div style={alreadySelected ? { opacity: 0.5 } : {}} className="nes-container with-title" onClick={() => {
                if (alreadySelected || !hasEnoughResources()) return; 
                onSelect(() => { setAlreadySelected(true); });
              }} key={location.index}>
                <p className="title">{location.name}</p>
                <Grid columns="3" rows="repeat(1, 64px)" width="auto" align="center" justify="center">
                    <div className="location-section">
                        <Box >
                            {/* <img className="location-card-type-icon" src={triangle} alt="card-type"></img> */}
                            {location.cost.resource.type}: {location.cost.resource.amount}
                        </Box>                
                        <Box >
                            <Flex gap="1">
                                
                            </Flex>
                        </Box> 
                    </div>

                    <div className="location-section">
                        <Box >
                            <img className="location-card-type-icon" src={triangle} alt="card-type"></img>
                        </Box>                
                        <Box >
                            <Flex gap="1">
                               
                            </Flex>
                        </Box> 
                    </div>
                    
                    <div className="location-section location-deploy-section">
                        <Box >
                            <img className="location-card-type-icon" src={deploy} alt="card-type"></img>
                        </Box>                
                    </div>
                </Grid>
            </div>
        </Box>
        
    );
}