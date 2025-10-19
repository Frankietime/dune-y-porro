// import "./LocationComponent.scss";
// import React from "react";

// type LocationProps = {
//     location: Location; 
//     resources: [];
//     position?: { top: number; right: number; }
//     onSelect: (callback: () => void) => void;
// }


// export const LocationComponent = ({
//     location, 
//     resources, 
//     position,
//     onSelect
// } : LocationProps) => {

//     const [alreadySelected, setAlreadySelected] = React.useState(false);

//     const hasEnoughResources = () => {
//         return resources.find(res => res.type == location.cost.resource.type && res.amount >= location.cost.resource.amount)
//     };

//     const styles = {
//         top: position?.top ?? 0,
//         right: position?.right ?? 0,
//         // bottom: 500
//     }

//     return (
//         <Grid 
//             key={location.index}
//             className="location-container" 
//             columns="3" rows="repeat(1, 64px)" 
//             style={alreadySelected ? { ...styles, opacity: 0.5 } : {...styles}} 
//             onClick={() => {
//                 if (alreadySelected || !hasEnoughResources()) return; 
//                 onSelect(() => { setAlreadySelected(true); });
//             }}
//         >
//             {/* <p className="title">{location.name}</p>
//             <div className="location-section">
//                 <Box>
//                     {location.cost.resource.type}: {location.cost.resource.amount}
//                 </Box>                
//                 <Box >
//                     <Flex gap="1">
                        
//                     </Flex>
//                 </Box> 
//             </div>

//             <div className="location-section">
//                 <Box >
//                     <img className="location-card-type-icon" src={triangle} alt="card-type"></img>
//                 </Box>                
//                 <Box >
//                     <Flex gap="1">
                        
//                     </Flex>
//                 </Box> 
//             </div>
            
//             <div className="location-section location-deploy-section">
//                 <Box >
//                     <img className="location-card-type-icon" src={deploy} alt="card-type"></img>
//                 </Box>                
//             </div> */}
//        </Grid>        
//     );
// }