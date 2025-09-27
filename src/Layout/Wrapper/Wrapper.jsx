// import React, { Suspense, lazy } from "react";

// const Header = lazy(() => import("../Header/Header"));
// const Footer = lazy(() => import("../Footer/Footer"));
// const VendorNavbar = lazy(() => import("../../Components/VendorNavbar"));

// export default function Wrapper({ children }) {
//   const role = localStorage.getItem("role");

//   return (
//     <Suspense fallback={<p>Loading...</p>}>
//       {role === "vendor" ? (
//         <div>
//           <VendorNavbar />
//           <main>{children}</main>
//         </div>
//       ) : (
//         <>
//           <Header />
//           <main>{children}</main>
//           <Footer />
//         </>
//       )}
//     </Suspense>
//   );
// }


import React, { Suspense, lazy } from "react";
import { Navigate, useLocation } from "react-router-dom";

const Header = lazy(() => import("../Header/Header"));
const Footer = lazy(() => import("../Footer/Footer"));
const VendorNavbar = lazy(() => import("../../Vendor/VendorNavbar"));

export default function Wrapper({ children }) {
  const role = localStorage.getItem("role");
  const location = useLocation();

  // 🚨 Prevent vendors from accessing non-vendor routes
  if (role === "vendor" && location.pathname === "/") {
    return <Navigate to="/Vendor/VendorDashboardPage" replace />;
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      {role === "vendor" ? (
        <div>
          <VendorNavbar />
          <main>{children}</main>
        </div>
      ) : (
        <>
          <Header />
          <main>{children}</main>
          <Footer />
        </>
      )}
    </Suspense>
  );
}
