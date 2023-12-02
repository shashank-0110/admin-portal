import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AllTasks.css";
import UpdateTask from "../components/UpdateTask";

function AllTasks() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [updateState, setUpdatestate] = useState(-1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
      );
      setData(response.data);
    };
    getData();
  }, []);
  const itemsPerPage = 10;
  const [showData, setShowdata] = useState(data);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setFilterValue(term);
  };

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const currentData = data.slice(startIndex, endIndex);

  const filteredData = currentData.filter((item) =>
    item.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // const filterData = selectedStatus
  //   ? currentData.filter((item) => item.status === selectedStatus)
  //   : currentData;

  const handleRowSelect = (id) => {
    const updatedSelectedRows = [...selectedRows];
    const index = updatedSelectedRows.indexOf(id);

    if (index !== -1) {
      // If already selected, unselect
      updatedSelectedRows.splice(index, 1);
    } else {
      // If not selected, select
      updatedSelectedRows.push(id);
    }

    setSelectedRows(updatedSelectedRows);
    setSelectAll(updatedSelectedRows.length === filteredData.length);
  };

  const handleSelectAll = () => {
    const allIds = filteredData.map((item) => item.id);
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : allIds);
  };

  const handleDeleteSelected = () => {
    // Filter out the selected rows
    const updatedData = filteredData.filter(
      (item) => !selectedRows.includes(item.id)
    );

    // Update the displayed data, clear selected rows, and reset pagination to the first page
    // setDisplayedData(updatedData);
    setCurrentPage(1);
  };

  return (
    <div className="maindiv">
      <div className="divsiz">
        {/* <button
          type="button"
          className="addbutton"
          onClick={() => handleCreate()}
        >
          Add New Task
        </button> */}
        <button
          onClick={handleDeleteSelected}
          disabled={selectedRows.length === 0}
        >
          Delete Selected
        </button>
        <input
          type="text"
          value={filterValue}
          onChange={handleSearch}
          placeholder="Search by Name "
        />
        {/* <select id="role" value={selectedStatus} onChange={handleStatusChange}>
          <option value="">All</option>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select> */}
        <div className="pagination">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            {">>"}
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {">"}
          </button>
          {Array.from({ length: Math.ceil(data.length / 10) }).map(
            (_, index) => (
              <button key={index} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            )
          )}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {"<"}
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            {"<<"}
          </button>
        </div>
      </div>

      <div>
        <Table className="table" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((datas) =>
              updateState === datas.id ? (
                <UpdateTask
                  data={datas}
                  updateState={updateState}
                  setUpdatestate={setUpdatestate}
                />
              ) : (
                <tr key={datas.id}>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(datas.id)}
                    onChange={() => handleRowSelect(datas.id)}
                  />
                  <td>{datas.name}</td>
                  <td>{datas.email}</td>
                  <td>{datas.role}</td>
                  <td>
                    <button
                      type="button"
                      className="edit"
                      onClick={() => handleUpdate(datas.id)}
                    >
                      EDIT
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="delete"
                      onClick={() => handleDelete(datas.id)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
  function handleDelete(id) {
    const del = async () => {
      const res = await axios.delete(
        `https://63e889595f3e35d898f1cf26.mockapi.io/to-do-list/` + id
      );
    };
    del();
    const updatedData = data.filter((d) => id !== d.id);
    setData(updatedData);
  }

  function handleUpdate(id) {
    setUpdatestate(id);
  }

  function handleCreate() {
    navigate("/");
  }
}

export default AllTasks;
