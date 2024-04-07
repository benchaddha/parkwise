// import { Image } from "./image";
// import React from "react";
// import PlaceComponent from './search.jsx';
// import { useState } from 'react';


// export const Demo = (props) => {
//   const [results, setResults] = useState([]);
//   return (
//     <div id="portfolio" className="text-center">
//       <div className="container">
//         <div className="section-title">
//           <h2>Demo</h2>
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
//             dapibus leonec.
//           </p>
//         </div>
//         <div className="row">
//           <div className="portfolio-items">
//             {props.data
//               ? props.data.map((d, i) => (
//                   <div
//                     key={`${d.title}-${i}`}
//                     className="col-sm-6 col-md-4 col-lg-4"
//                   >
//                     <PlaceComponent setResults={setResults} />
//                   </div>
//                 ))
//               : "Loading..."}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
import React from "react";
import PlaceComponent from './search.jsx';

export const Demo = () => {
  return (
    <div id="portfolio" className="text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="container">
        <div className="section-title">
          <h2 style={{ color: '#FFFFFF'}} >Demo</h2>
          <p style={{ color: '#FFFFFF'}}>
            Where are you headed? Search for a place to get started.
          </p>
        </div>
        {/* PlaceComponent without mapping or iterating */}
        <PlaceComponent />
      </div>
    </div>
  );
};
