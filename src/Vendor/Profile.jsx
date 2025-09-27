// "use client";

// import { useEffect, useState } from "react";

// import { useVendorStore } from "../lib/vendorStore";

// export default function Profile() {
//   const { vendor, fetchVendorProfile, updateVendorProfile } = useVendorStore();
//   const [editing, setEditing] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     shopName: "",
//     phone: "",
//   });

//   useEffect(() => {
//     fetchVendorProfile();
//   }, [fetchVendorProfile]);

//   useEffect(() => {
//     if (vendor) {
//       setForm({
//         name: vendor.name || "",
//         email: vendor.email || "",
//         shopName: vendor.shopName || "",
//         phone: vendor.phone || "",
//       });
//     }
//   }, [vendor]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     await updateVendorProfile(form);
//     setEditing(false);
//   };

//   if (!vendor) return <p className="p-4">Loading...</p>;

//   return (
//     <div className="p-6 space-y-6">
//       {/* Profile Card */}
//       <Card className="shadow-md rounded-2xl">
//         <CardContent className="p-6 space-y-4">
//           <h2 className="text-xl font-semibold">Vendor Profile</h2>

//           {editing ? (
//             <div className="space-y-3">
//               <Input
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 placeholder="Name"
//               />
//               <Input
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 placeholder="Email"
//                 disabled
//               />
//               <Input
//                 name="shopName"
//                 value={form.shopName}
//                 onChange={handleChange}
//                 placeholder="Shop Name"
//               />

//               <div className="flex gap-2">
//                 <Button onClick={handleSave}>Save</Button>
//                 <Button variant="outline" onClick={() => setEditing(false)}>
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-2">
//               <p>
//                 <strong>Name:</strong> {vendor.vendor.user.name}
//               </p>
//               <p>
//                 <strong>Email:</strong> {vendor.vendor.user.email}
//               </p>
//               <p>
//                 <strong>Shop:</strong> {vendor.vendor.shopName}
//               </p>

//               <Button
//                 className="bg-green-500 text-white"
//                 onClick={() => setEditing(true)}
//               >
//                 Edit Profile
//               </Button>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Card className="shadow rounded-xl">
//           <CardContent className="p-4 text-center">
//             <h3 className="text-lg font-semibold">Total Products</h3>
//             <p className="text-2xl font-bold">{vendor.totalProducts || 0}</p>
//           </CardContent>
//         </Card>
//         <Card className="shadow rounded-xl">
//           <CardContent className="p-4 text-center">
//             <h3 className="text-lg font-semibold">Total Orders</h3>
//             <p className="text-2xl font-bold">{vendor.totalOrders || 0}</p>
//           </CardContent>
//         </Card>
//         <Card className="shadow rounded-xl">
//           <CardContent className="p-4 text-center">
//             <h3 className="text-lg font-semibold">Revenue</h3>
//             <p className="text-2xl font-bold">₹{vendor.revenue || 0}</p>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useVendorStore } from "../lib/vendorStore";

export default function Profile() {
  const { vendor, fetchVendorProfile, updateVendorProfile } = useVendorStore();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    shopName: "",
    phone: "",
  });

  useEffect(() => {
    fetchVendorProfile();
  }, [fetchVendorProfile]);

  useEffect(() => {
    if (vendor) {
      setForm({
        name: vendor.name || "",
        email: vendor.email || "",
        shopName: vendor.shopName || "",
        phone: vendor.phone || "",
      });
    }
  }, [vendor]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await updateVendorProfile(form);
    setEditing(false);
  };

  if (!vendor) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Profile Card */}
      <div className="bg-white shadow-md rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold">Vendor Profile</h2>

        {editing ? (
          <div className="space-y-3">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
            <input
              type="text"
              name="shopName"
              value={form.shopName}
              onChange={handleChange}
              placeholder="Shop Name"
              className="w-full p-2 border rounded"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="border px-4 py-2 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {vendor.vendor.user.name}
            </p>
            <p>
              <strong>Email:</strong> {vendor.vendor.user.email}
            </p>
            <p>
              <strong>Shop:</strong> {vendor.vendor.shopName}
            </p>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="text-2xl font-bold">{vendor.totalProducts || 0}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl font-bold">{vendor.totalOrders || 0}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h3 className="text-lg font-semibold">Revenue</h3>
          <p className="text-2xl font-bold">₹{vendor.revenue || 0}</p>
        </div>
      </div>
    </div>
  );
}
