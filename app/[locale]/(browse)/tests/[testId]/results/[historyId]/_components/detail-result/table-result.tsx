// import React from "react"
// import { type SectionHistory } from "@/queries/test/get-history"

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"

// type Props = {
//   sectionHistories: SectionHistory[]
// }

// function TableResult({ sectionHistories }: Props) {
//   return (
//     <div className="mb-4 mt-1 grid w-full rounded-xl border bg-muted">
//       <div className="overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="text-nowrap">Phân loại câu hỏi</TableHead>
//               <TableHead className="text-nowrap">Số câu đúng</TableHead>
//               <TableHead className="text-nowrap">Số câu sai</TableHead>
//               <TableHead className="text-nowrap">Số câu bỏ qua</TableHead>
//               <TableHead className="text-nowrap">Danh sách câu hỏi</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {sectionHistories.map((section) => (
//               <TableRow key={section.}>
//                 <TableCell>
//                   <div className="text-nowrap font-medium">
//                     {new Date(test.takenDate).toDateString()}
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex flex-wrap gap-2">{/* {test.} */}</div>
//                 </TableCell>
//                 <TableCell>
//                   <div className="text-nowrap">{`${test.totalRightAnswer}/${test.totalQuestion}`}</div>
//                 </TableCell>
//                 <TableCell>
//                   <div className="text-nowrap">
//                     {convertSecondToText(test.totalCompletionTime)}
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <Link
//                     href={`/tests/${testId}/results/${test.testHistoryId}`}
//                     className="cursor-pointer text-nowrap text-right text-primary hover:underline"
//                   >
//                     Xem chi tiết
//                   </Link>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   )
// }

// export default TableResult
