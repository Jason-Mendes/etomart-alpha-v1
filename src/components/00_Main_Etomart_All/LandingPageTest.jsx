
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Aug 2023', Income: 6529, Rent: 2900, StudentLoan: 1640, Transportation: 750, Groceries: 600, DiningOut: 400, Savings: 650, Other: 1000 },
  { month: 'Sep 2023', Income: 6925, Rent: 2900, StudentLoan: 1640, Transportation: 780, Groceries: 620, DiningOut: 420, Savings: 650, Other: 1050 },
  { month: 'Oct 2023', Income: 7100, Rent: 2900, StudentLoan: 1640, Transportation: 800, Groceries: 610, DiningOut: 430, Savings: 650, Other: 1100 },
  { month: 'Nov 2023', Income: 8466, Rent: 2900, StudentLoan: 1640, Transportation: 820, Groceries: 630, DiningOut: 450, Savings: 650, Other: 1200 },
  { month: 'Dec 2023', Income: 6925, Rent: 2900, StudentLoan: 1640, Transportation: 850, Groceries: 650, DiningOut: 500, Savings: 650, Other: 1300 },
  { month: 'Jan 2024', Income: 8218, Rent: 2900, StudentLoan: 1640, Transportation: 830, Groceries: 640, DiningOut: 470, Savings: 650, Other: 1150 },
  { month: 'Feb 2024', Income: 8209, Rent: 2900, StudentLoan: 1640, Transportation: 810, Groceries: 620, DiningOut: 440, Savings: 650, Other: 1100 },
  { month: 'Mar 2024', Income: 8224, Rent: 2900, StudentLoan: 1640, Transportation: 790, Groceries: 600, DiningOut: 420, Savings: 650, Other: 1050 },
  { month: 'Apr 2024', Income: 8224, Rent: 2900, StudentLoan: 1640, Transportation: 770, Groceries: 590, DiningOut: 400, Savings: 650, Other: 1000 },
  { month: 'May 2024', Income: 8334, Rent: 2900, StudentLoan: 1640, Transportation: 750, Groceries: 580, DiningOut: 380, Savings: 650, Other: 950 },
  { month: 'Jun 2024', Income: 8224, Rent: 2900, StudentLoan: 1640, Transportation: 730, Groceries: 570, DiningOut: 360, Savings: 650, Other: 900 },
  { month: 'Jul 2024', Income: 13877, Rent: 2800, StudentLoan: 1640, Transportation: 710, Groceries: 560, DiningOut: 350, Savings: 650, Other: 1200 },
  { month: 'Aug 2024', Income: 9784, Rent: 3000, StudentLoan: 1640, Transportation: 690, Groceries: 550, DiningOut: 340, Savings: 650, Other: 1100 }
];

const FinancialBreakdownChart = () => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Income" fill="#82ca9d" />
          <Bar dataKey="Rent" stackId="expenses" fill="#8884d8" />
          <Bar dataKey="StudentLoan" stackId="expenses" fill="#ffc658" />
          <Bar dataKey="Transportation" stackId="expenses" fill="#ff8042" />
          <Bar dataKey="Groceries" stackId="expenses" fill="#a4de6c" />
          <Bar dataKey="DiningOut" stackId="expenses" fill="#d0ed57" />
          <Bar dataKey="Savings" stackId="expenses" fill="#83a6ed" />
          <Bar dataKey="Other" stackId="expenses" fill="#8dd1e1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinancialBreakdownChart;

// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart } from 'recharts';

// const data = [
//   { month: 'Aug 2023', totalExpenses: 7350 },
//   { month: 'Sep 2023', totalExpenses: 7420 },
//   { month: 'Oct 2023', totalExpenses: 7550 },
//   { month: 'Nov 2023', totalExpenses: 7470 },
//   { month: 'Dec 2023', totalExpenses: 7680 },
//   { month: 'Jan 2024', totalExpenses: 7530 },
//   { month: 'Feb 2024', totalExpenses: 7570 },
//   { month: 'Mar 2024', totalExpenses: 7520 },
//   { month: 'Apr 2024', totalExpenses: 7480 },
//   { month: 'May 2024', totalExpenses: 7440 },
//   { month: 'Jun 2024', totalExpenses: 7400 },
//   { month: 'Jul 2024', totalExpenses: 7260 },
//   { month: 'Aug 2024', totalExpenses: 7420 }
// ];

// const ExpenseBarTrendChart = () => {
//   return (
//     <div className="w-full h-[400px]">
//       <ResponsiveContainer width="100%" height="100%">
//         <ComposedChart
//           data={data}
//           margin={{
//             top: 20,
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
//           <Bar dataKey="totalExpenses" fill="#8884d8" name="Total Expenses" />
//           <Line type="monotone" dataKey="totalExpenses" stroke="#ff7300" name="Trend" />
//         </ComposedChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ExpenseBarTrendChart;

// import React from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// const data = [
//   { name: 'Rent', value: 2900 },
//   { name: 'Student Loan', value: 1640 },
//   { name: 'Transportation (Yango)', value: 800 },
//   { name: 'Groceries', value: 600 },
//   { name: 'Dining Out', value: 400 },
//   { name: 'Utilities', value: 300 },
//   { name: 'Entertainment', value: 250 },
//   { name: 'Savings', value: 650 },
//   { name: 'Other', value: 500 }
// ];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c'];

// const ExpenseBreakdownChart = () => {
//   return (
//     <div className="w-full h-[400px]">
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             labelLine={false}
//             outerRadius={150}
//             fill="#8884d8"
//             dataKey="value"
//             label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ExpenseBreakdownChart;

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