// tìm kiếm 
import React, { useState, useMemo } from "react";
import Scrollbar from "react-scrollbars-custom";
import {
  Row,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import { Link } from "react-router-dom";
import Trie from "./Trie.js";
import specializationList from "./specialization";

const Search = () => {
  // GIỮ NGUYÊN DANH SÁCH BÁC SĨ CỦA DŨNG
  const dummyDoctors = [
    { _id: "0", name: "NGUYEN MANH DUNG", specialization: "pathology", phoneNumber: "0999999999", feesPerSession: "999" },
    { _id: "1", name: "CHINMAY KULKARNI", specialization: "pathology", phoneNumber: "12345678", feesPerSession: "300" },
    { _id: "2", name: "AKANKSHA TANWAR", specialization: "anaesthesia", phoneNumber: "1234567892", feesPerSession: "400" },
    { _id: "3", name: "PRIYANK KHANNA", specialization: "dermatology", phoneNumber: "1234567893", feesPerSession: "800" },
    { _id: "4", name: "DANIEL ABRAHAMS", specialization: "emergency medicine", phoneNumber: "1234567894", feesPerSession: "800" },
    { _id: "5", name: "PRASHANT SHAH", specialization: "general practice", phoneNumber: "1234567895", feesPerSession: "300" },
  ];

  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [Doctor, setDoctor] = useState(dummyDoctors);

  const memoized_trie = useMemo(() => {
    const trie = new Trie();
    for (let i = 0; i < specializationList.length; i++) {
      trie.insert(specializationList[i]);
    }
    return trie;
  }, []);

  // GIỮ NGUYÊN LOGIC SEARCH CỦA DŨNG
  const onTextChanged = (e) => {
    let value = e.target.value;
    setText(value);
    if (value !== "") {
      const found = memoized_trie.find(value.toLowerCase());
      setSuggestions(found || []);
      const filtered = dummyDoctors.filter(
        (doc) =>
          doc.specialization.toLowerCase().includes(value.toLowerCase()) ||
          doc.name.toLowerCase().includes(value.toLowerCase())
      );
      setDoctor(filtered);
    } else {
      setSuggestions([]);
      setDoctor(dummyDoctors);
    }
  };

  const suggestionSelected = (value) => {
    setText(value);
    setSuggestions([]);
    UpdateDisplay(value);
  };

  const UpdateDisplay = (searchText) => {
    if (!searchText) {
      setDoctor(dummyDoctors);
      return;
    }
    const filtered = dummyDoctors.filter((doc) =>
      doc.specialization.toLowerCase().includes(searchText.toLowerCase())
    );
    setDoctor(filtered);
    setSuggestions([]);
  };

  return (
    // THÊM LỚP BAO p-4 ĐỂ CÁCH LỀ TRÁI PHẢI
    <div style={{ position: "relative" }} className="p-4"> 
      <Row className="mb-3">
        <Col>
          <InputGroup style={{ position: "relative" }}>
            <Input
              value={text}
              placeholder="Search by specialization or name..."
              onChange={onTextChanged}
              autoComplete="off"
            />
            <InputGroupAddon addonType="append">
              <Button color="primary" onClick={() => UpdateDisplay(text)}>
                Search Doctor
              </Button>
            </InputGroupAddon>
          </InputGroup>

          {suggestions.length > 0 && (
            <ul
              className="list-group position-absolute w-100"
              style={{ zIndex: 9999, top: "40px" }}
            >
              {suggestions.slice(0, 5).map((item) => (
                <li
                  className="list-group-item list-group-item-action"
                  key={item}
                  onClick={() => suggestionSelected(item)}
                  style={{ cursor: "pointer", color: "#000" }}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </Col>
      </Row>

      <Scrollbar noScrollX style={{ height: "64vh", width: "100%" }}>
        {/* Thêm class 'px-2' để các card bên trong không dính sát viền Scrollbar */}
        <div className="row mt-2 px-2"> 
          {Doctor.length > 0 ? (
            Doctor.map((doc) => (
              <div className="col-sm-6 mb-3" key={doc._id}>
                <div className="card shadow-sm border-info" style={{ borderRadius: "10px" }}>
                  <div className="card-body">
                    <h6 className="text-primary">
                      Doctor Name:{" "}
                      <span
                        className="text-uppercase"
                        style={{ fontWeight: "bold" }}
                      >
                        {doc.name}
                      </span>
                    </h6>
                    <div className="small text-muted">
                      Specialization: {doc.specialization}
                    </div>
                    <div className="small">Phone: {doc.phoneNumber}</div>
                    <div className="row mt-2 align-items-center">
                      <div
                        className="col-6 text-danger"
                        style={{ fontWeight: "bold" }}
                      >
                        Fees: ${doc.feesPerSession}
                      </div>
                      <div className="col-6 text-right">
                        <Link
                          to={{
                            pathname: "/patient/selectdate",
                            doctor: { doctor: doc },
                          }}
                        >
                          <button className="btn btn-sm btn-primary px-3">
                            Book Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-white text-center mt-5">
              No doctors found for "{text}"
            </div>
          )}
        </div>
      </Scrollbar>
    </div>
  );
};

export default Search;