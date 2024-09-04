import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Rent', value: 2900 },
  { name: 'Student Loan', value: 1640 },
  { name: 'Transportation (Yango)', value: 800 },
  { name: 'Groceries', value: 600 },
  { name: 'Dining Out', value: 400 },
  { name: 'Utilities', value: 300 },
  { name: 'Entertainment', value: 250 },
  { name: 'Savings', value: 650 },
  { name: 'Other', value: 500 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c'];

const ExpenseBreakdownChart = () => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseBreakdownChart;

// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   { month: 'Aug 2023', Rent: 2900, StudentLoan: 1640, Transportation: 750, Groceries: 580, DiningOut: 380, Utilities: 290, Entertainment: 240, Savings: 650 },
//   { month: 'Sep 2023', Rent: 2900, StudentLoan: 1640, Transportation: 780, Groceries: 600, DiningOut: 400, Utilities: 300, Entertainment: 250, Savings: 650 },
//   { month: 'Oct 2023', Rent: 2900, StudentLoan: 1640, Transportation: 800, Groceries: 590, DiningOut: 410, Utilities: 310, Entertainment: 260, Savings: 650 },
//   { month: 'Nov 2023', Rent: 2900, StudentLoan: 1640, Transportation: 820, Groceries: 610, DiningOut: 390, Utilities: 305, Entertainment: 255, Savings: 650 },
//   { month: 'Dec 2023', Rent: 2900, StudentLoan: 1640, Transportation: 850, Groceries: 630, DiningOut: 420, Utilities: 320, Entertainment: 270, Savings: 650 },
//   { month: 'Jan 2024', Rent: 2900, StudentLoan: 1640, Transportation: 830, Groceries: 620, DiningOut: 410, Utilities: 315, Entertainment: 265, Savings: 650 },
//   { month: 'Feb 2024', Rent: 2900, StudentLoan: 1640, Transportation: 810, Groceries: 600, DiningOut: 400, Utilities: 310, Entertainment: 260, Savings: 650 },
//   { month: 'Mar 2024', Rent: 2900, StudentLoan: 1640, Transportation: 790, Groceries: 590, DiningOut: 390, Utilities: 305, Entertainment: 255, Savings: 650 },
//   { month: 'Apr 2024', Rent: 2900, StudentLoan: 1640, Transportation: 780, Groceries: 580, DiningOut: 380, Utilities: 300, Entertainment: 250, Savings: 650 },
//   { month: 'May 2024', Rent: 2900, StudentLoan: 1640, Transportation: 770, Groceries: 570, DiningOut: 370, Utilities: 295, Entertainment: 245, Savings: 650 },
//   { month: 'Jun 2024', Rent: 2900, StudentLoan: 1640, Transportation: 760, Groceries: 560, DiningOut: 360, Utilities: 290, Entertainment: 240, Savings: 650 },
//   { month: 'Jul 2024', Rent: 2800, StudentLoan: 1640, Transportation: 750, Groceries: 550, DiningOut: 350, Utilities: 285, Entertainment: 235, Savings: 650 },
//   { month: 'Aug 2024', Rent: 3000, StudentLoan: 1640, Transportation: 740, Groceries: 540, DiningOut: 340, Utilities: 280, Entertainment: 230, Savings: 650 }
// ];

// const ExpenseTrendChart = () => {
//   return (
//     <div className="w-full h-[400px]">
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart
//           data={data}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="Rent" stroke="#8884d8" activeDot={{ r: 8 }} />
//           <Line type="monotone" dataKey="StudentLoan" stroke="#82ca9d" />
//           <Line type="monotone" dataKey="Transportation" stroke="#ffc658" />
//           <Line type="monotone" dataKey="Groceries" stroke="#ff7300" />
//           <Line type="monotone" dataKey="DiningOut" stroke="#a4de6c" />
//           <Line type="monotone" dataKey="Utilities" stroke="#8dd1e1" />
//           <Line type="monotone" dataKey="Entertainment" stroke="#d0ed57" />
//           <Line type="monotone" dataKey="Savings" stroke="#b5a8d1" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ExpenseTrendChart;