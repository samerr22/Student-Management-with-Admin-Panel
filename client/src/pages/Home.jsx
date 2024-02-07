import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const [students, setStudents] = useState([]);

  console.log("user", students);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`/api/student/getAllstudents`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setStudents(data.students);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    
      fetchStudents();
    
  }, []);

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {students && students.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>StudentId</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>image</Table.HeadCell>
              <Table.HeadCell>age</Table.HeadCell>
              <Table.HeadCell>status</Table.HeadCell>
            </Table.Head>
            {students.map((student) => (
              <Table.Body className="divide-y">
                <Table.Row
                  key={student._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>{student.Id}</Table.Cell>
                  <Table.Cell>{student.name}</Table.Cell>
                  <Table.Cell>
                    <img
                      src={student.image}
                      alt={student.name}
                      className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                    />
                  </Table.Cell>
                  <Table.Cell>{student.age}</Table.Cell>
                  <Table.Cell>{student.status}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>You have no users yet!</p>
      )}
    </div>
  );
}
