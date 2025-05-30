import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useEffect, useRef, useState } from "react";
import { userRequest } from "../../axiosReqMethods";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Loader from "./Loader";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import Submitdilog from "../Dilogs/Submitdilog";
import Deletedilog from "../Dilogs/Deletedilog";

function Addbook({ schemename , backtodashboard,setschemename, handlerefresh }) {

  const [categorylist, setcategorylist] = useState();
  const [subjectlist, setsubjectlist] = useState();
  const [booklist, setbooklist] = useState([]);
  const [schemedata, setschemedata] = useState();
  const [totalprice, settotalprice] = useState(0);
  const [loader, setloader] = useState(false);
  const [edit, setedit] = useState(false);
  const [deletedata, setdeletedata] = useState();
  const [tempprice, settempprice] = useState();

  const [deletedilog, setdeletedilog] = useState(false);
  const [submitdilog, setsubmitdilog] = useState(false);
  const email = localStorage.getItem("email");
  const User_id = localStorage.getItem("user_id");
  const User_name = localStorage.getItem("username");
  const [bookdata, setbookdata] = useState({
    ISBN: "",
    BookName: "",
    BookNameGuj: "",
    BookPages: "",
    AuthorName: "",
    AuthorNameGuj: "",
    PublisherName: "",
    Price: "",
    Discribption: "",
    Size: "",
    Binding: "",
    Weight: "",
    Language: "",
    Subject: "",
    PubYear: "",
    Category: "",
    schemename: schemename,
    Email: email,
    userId: User_id,
    User_name: User_name
  });


 const pdfref = useRef();
 const downloadpdf = useReactToPrint({
   contentRef: pdfref,
   documentTitle: "mihir",
 });
  useEffect(() => {
    const dataget = async () => {
      setloader(true)
      try {
        
        const res4 = await userRequest.get(`/api/v1/subject/getSubject`);
        console.log(res4);
        setsubjectlist(res4.data.Subject);
        
        
        const res3 = await userRequest.get(
          `/api/v1/scheam/getOneScheam/${schemename}`
        );

        setschemedata(res3.data.Scheam);
        
        const res1 = await userRequest.get(
          `/api/v1/CategoryName/getCategoryName`
        );
        setcategorylist(res1.data.Category);
        const res2 = await userRequest.get(
          `/api/v1/bookeEntry/getBook/${localStorage.getItem(
            "user_id"
          )}/${schemename}`
        );
        
        
        
        if (res2.data.bookEntry) {
          
        setbooklist(res2.data.bookEntry);
        }
        
        
        let count = 0;
        for (let index = 0; index < res2.data.bookEntry.length; index++) {
          count += Number(res2.data.bookEntry[index].Price);
        }
        settotalprice(count)
        
      } catch (error) {
        console.log(error);
        setloader(false);
        
      alert("Somthing Wrong!! Try Again");
      }
      setloader(false);
    };
    dataget();
  }, []);

  function handleinput(e) {
    
    const { name, value } = e.target;

    setbookdata({
      ...bookdata,
      [name]: value,
    });
    
    
  }
  async function handleadd() {
    if (Number(schemedata.max_book_number) <= booklist.length) {
         alert("You Reached Maximum book Limit");
    }
    
    else if (Number(totalprice) > Number(schemedata.total_book_price) || (Number(bookdata.Price)+Number(totalprice))>Number(schemedata.total_book_price)) {
      alert("You Reached Maximum price Limit Of Set");
    }
    else if (Number(bookdata.Price) < Number(schemedata.book_price)) {
      alert(`Your Book Can Not Be Cheaper Than ${schemedata.book_price}`);
    }
    else if (Number(bookdata.Price) > Number(schemedata.max_book_price)) {
      alert(`Your Book Can Not Be Expensive Than ${schemedata.max_book_price}`);
    }
    else if (Number(bookdata.ISBN.length) < Number(13) || Number(bookdata.ISBN.length) > 13) {
      alert("Please Enter 13 Digit ISBN Number");
    }
    else if(bookdata.ISBN === "" || bookdata.AuthorName==="" || bookdata.AuthorNameGuj===""|| bookdata.Binding===""|| bookdata.BookName===""|| bookdata.BookNameGuj===""|| bookdata.BookPages===""|| bookdata.Category===""|| bookdata.Discribption===""|| bookdata.ISBN===""|| bookdata.Language===""|| bookdata.Price===""|| bookdata.PubYear===""|| bookdata.PublisherName===""|| bookdata.Size===""|| bookdata.Subject===""|| bookdata.Weight===""){
      alert("All Field Are Require");
    }
      else if (
        Number(bookdata.Price) <= 0 ||
        Number(bookdata.BookPages) <= 0 ||
        Number(bookdata.PubYear) <= 0 ||
        Number(bookdata.Weight) <= 0
    ) {
      alert("Any Number Value Can Not Be Nagative");
      } else {
        try {
          setloader(true);
          const res = await userRequest.post("/api/v1/bookeEntry/addBook", {
            bookdata,
          });

          const res2 = await userRequest.get(
            `/api/v1/bookeEntry/getBook/${localStorage.getItem(
              "user_id"
            )}/${schemename}`
          );
          setbooklist(res2.data.bookEntry);

          if (res.status === 200) {
            setbookdata({
              ISBN: "",
              BookName: "",
              BookNameGuj: "",
              BookPages: "",
              AuthorName: "",
              AuthorNameGuj: "",
              PublisherName: "",
              Price: "",
              Discribption: "",
              Size: "",
              Binding: "",
              Weight: "",
              Language: "",
              Subject: "",
              PubYear: "",
              Category: "",
              schemename: schemename,
              Email: email,
              userId: User_id,
              User_name: User_name,
            });
          }

          setloader(false);
          let count = 0;
          for (let index = 0; index < res2.data.bookEntry.length; index++) {
            count += Number(res2.data.bookEntry[index].Price);
          }
          settotalprice(count);
        } catch (error) {
          alert("Try Again.......");
          setloader(false);
        }
      }

   
  }
  async function handledelete(i) {
    // list.remove(i);
    setloader(true)
    
    setbooklist([]);
    const res = await userRequest.delete(`/api/v1/bookeEntry/delete/${i._id}`);
    
     const res2 = await userRequest.get(
       `/api/v1/bookeEntry/getBook/${localStorage.getItem(
         "user_id"
       )}/${schemename}`
     );


     if (res2.data.bookEntry) {
       setbooklist(res2.data.bookEntry);
     }
     setdeletedilog(false);
    setloader(false);

  }
  const[editdata,seteditdata] = useState()
  function showedit(i) {
    
    settempprice(i.Price);
    seteditdata(i._id)
    setedit(true);
    setbookdata(i);
  }
  async function handleedit(i) {
    // list.remove(i);
//     if (Number(schemedata.max_book_number) <= booklist.length) {
//       alert(`You Can Not Add More Than ${schemedata.max_book_number} Books`);
//  }
  if (
   Number(totalprice) > Number(schemedata.total_book_price) ||
   Number(bookdata.Price) + Number(totalprice) - Number(tempprice) >
     Number(schemedata.total_book_price)
 ) {
   alert("You Reached Maximum price Limit Of Set");
 } else if (Number(bookdata.Price) < Number(schemedata.book_price)) {
   alert(`Your Book Can Not Be Cheaper Than ${schemedata.book_price}`);
 } else if (Number(bookdata.Price) > Number(schemedata.max_book_price)) {
   alert(`Your Book Can Not Be Expensive Than ${schemedata.max_book_price}`);
 } else if (
   Number(bookdata.ISBN.length) < 13 ||
   Number(bookdata.ISBN.length) > 13
 ) {
   alert("Please Enter 13 Digit ISBN Number");
 } else if (
   bookdata.ISBN === "" ||
   bookdata.AuthorName === "" ||
   bookdata.AuthorNameGuj === "" ||
   bookdata.Binding === "" ||
   bookdata.BookName === "" ||
   bookdata.BookNameGuj === "" ||
   bookdata.BookPages === "" ||
   bookdata.Category === "" ||
   bookdata.Discribption === "" ||
   bookdata.ISBN === "" ||
   bookdata.Language === "" ||
   bookdata.Price === "" ||
   bookdata.PubYear === "" ||
   bookdata.PublisherName === "" ||
   bookdata.Size === "" ||
   bookdata.Subject === "" ||
   bookdata.Weight === ""
 ) {
   alert("All Field Are Require");
 } else {
   setloader(true);
   const res = await userRequest.put(`/api/v1/bookeEntry/update/${editdata}`, {
     bookdata,
   });
   setedit(false);
   setbookdata({
     ISBN: "",
     BookName: "",
     BookNameGuj: "",
     BookPages: "",
     AuthorName: "",
     AuthorNameGuj: "",
     PublisherName: "",
     Price: "",
     Discribption: "",
     Size: "",
     Binding: "",
     Weight: "",
     Language: "",
     Subject: "",
     PubYear: "",
     Category: "",
     schemename: schemename,
     Email: email,
     userId: User_id,
     User_name: User_name,
   });

   setbooklist([]);
   const res2 = await userRequest.get(
     `/api/v1/bookeEntry/getBook/${localStorage.getItem(
       "user_id"
     )}/${schemename}`
   );
   if (res2.data.bookEntry) {
     setbooklist(res2.data.bookEntry);
   }
   let count = 0;
   for (let index = 0; index < res2.data.bookEntry.length; index++) {
     count += Number(res2.data.bookEntry[index].Price);
   }
   settotalprice(count);
 }
      
      
    setloader(false);
  }
  async function handlesubmit() {
    if (booklist.length > 0) {
      setsubmitdilog(false);
      setloader(true)
      const res = await userRequest.post("/api/v1/submited/addSubmit", {scheamName : schemename, userId : User_id},
      );
      backtodashboard()
      handlerefresh()
      
    setloader(false);
    }
    else{
      alert("Please Add Some Books For Submission")
      setsubmitdilog(false)
      
    setloader(false);
    }
    
  }
  return (
    <>
      <div className="main-container">
        {/* <Navbar /> */}
        {loader && <Loader />}
        {submitdilog && (
          <Submitdilog
            handlesubmit={handlesubmit}
            setschemename={setschemename}
            setsubmitdilog={setsubmitdilog}
          />
        )}
        {deletedilog && (
          <Deletedilog
            handledelete={handledelete}
            deletedata={deletedata}
            setdeletedilog={setdeletedilog}
          />
        )}
        <div className="addbook-main-container">
          <>
            <div>
              <div className="Addbook-container">
                <div className="btn-container">
                  <div className="btn-container">
                    <button
                      onClick={() => {
                        backtodashboard();
                      }}
                      className="back btn"
                    >
                      <KeyboardBackspaceOutlinedIcon />
                      DashBoard
                    </button>

                    <h1>Book List For {schemename}</h1>
                    <button
                      onClick={() => setsubmitdilog(true)}
                      className="submit btn"
                    >
                      <PublishOutlinedIcon />
                      Submit
                    </button>
                  </div>
                </div>
                {/* <h1>Book List For {schemename}</h1> */}
                <div className="book-info">
                  {booklist && schemedata && (
                    <>
                      <h4>
                        Book Added {booklist.length} /{" "}
                        {schemedata.max_book_number}
                      </h4>
                      <h4>
                        Total Value Of Set {totalprice} /{" "}
                        {schemedata.total_book_price}{" "}
                      </h4>
                      <h4>
                        Book Value {schemedata.book_price} -{" "}
                        {schemedata.max_book_price}
                      </h4>
                    </>
                  )}
                </div>

                <div className="Addbook-inputarea">
                  <label>ISBN : </label>
                  <input
                    required
                    name="ISBN"
                    value={bookdata.ISBN}
                    maxLength={13}
                    minLength={13}
                    onChange={handleinput}
                    className="input"
                    type="number"
                  />
                </div>
                <div className="Addbook-inputarea">
                  <label>Book Name : </label>
                  <input
                    required
                    className="input"
                    type="text"
                    onChange={handleinput}
                    name="BookName"
                    value={bookdata.BookName}
                  />
                </div>
                <div className="Addbook-inputarea">
                  <label>Book Name (Guj) : </label>
                  <input
                    required
                    className="input"
                    type="text"
                    onChange={handleinput}
                    name="BookNameGuj"
                    value={bookdata.BookNameGuj}
                  />
                </div>
                <div className="Addbook-inputarea">
                  <label>Author Name : </label>
                  <input
                    required
                    className="input"
                    type="text"
                    onChange={handleinput}
                    name="AuthorName"
                    value={bookdata.AuthorName}
                  />
                </div>
                <div className="Addbook-inputarea">
                  <label>Author Name (Guj) : </label>
                  <input
                    required
                    className="input"
                    type="text"
                    onChange={handleinput}
                    name="AuthorNameGuj"
                    value={bookdata.AuthorNameGuj}
                  />
                </div>
                <div className="Addbook-inputarea">
                  <label> Price : </label>
                  <input
                    required
                    className="input"
                    type="number"
                    onChange={handleinput}
                    name="Price"
                    value={bookdata.Price}
                  />
                </div>
                <div className="Addbook-inputarea">
                  <label>Subject : </label>
                  <select
                    required
                    className="input"
                    type="text"
                    onChange={handleinput}
                    name="Subject"
                    value={bookdata.Subject}
                  >
                    <option value={""}>Select</option>
                    {subjectlist &&
                      subjectlist.map((i) => (
                        <option key={i.SubjectName}>{i.SubjectName}</option>
                      ))}
                  </select>
                </div>
                <div className="Addbook-inputarea">
                  <label> Category : </label>
                  <select
                    required
                    className="input"
                    onChange={handleinput}
                    name="Category"
                    value={bookdata.Category}
                  >
                    <option value={""}>Select</option>
                    {categorylist &&
                      categorylist.map((i) => (
                        <option key={i.CategoryName}>{i.CategoryName}</option>
                      ))}
                  </select>
                </div>

                <div className="Addbook-inputarea">
                  <label> Publisher Name : </label>
                  <input
                    required
                    className="input"
                    type="text"
                    onChange={handleinput}
                    name="PublisherName"
                    value={bookdata.PublisherName}
                  />
                </div>
                <div className="Addbook-inputarea">
                  <label> Pub Year : </label>
                  <input
                    required
                    className="sort-input"
                    type="number"
                    onChange={handleinput}
                    name="PubYear"
                    value={bookdata.PubYear}
                  />
                </div>
                <div className="Addbook-inputarea">
                  <label>Language : </label>
                  <select
                    required
                    className="input"
                    type="text"
                    onChange={handleinput}
                    name="Language"
                    value={bookdata.Language}
                  >
                    <option>Select</option>
                    <option>Gujarati</option>
                    <option>Hindi</option>
                    <option>English</option>
                  </select>
                </div>
                <div className="Addbook-inputarea">
                  <label>Number Of Pages : </label>
                  <input
                    required
                    className="sort-input"
                    type="number"
                    onChange={handleinput}
                    name="BookPages"
                    value={bookdata.BookPages}
                  />
                </div>
                <div className="Addbook-inputarea">
                  <label>Weight : </label>
                  <input
                    required
                    className="sort-input"
                    type="number"
                    onChange={handleinput}
                    name="Weight"
                    value={bookdata.Weight}
                  />
                </div>
                <div className="Addbook-inputarea">
                  <label>Binding : </label>
                  {/* <input
                    required
                    className="sort-input"
                    onChange={handleinput}
                    type="text"
                    name="Binding"
                    value={bookdata.Binding}
                  /> */}
                  <select
                    required
                    className="input"
                    type="text"
                    onChange={handleinput}
                    name="Binding"
                    value={bookdata.Binding}
                  >
                    <option value={""}>Select</option>
                    <option value={"Hard"}>Hard</option>
                    <option value={"Soft"}>Soft</option>
                    <option value={"Center-Pin"}>Center-pin</option>
                  </select>
                </div>
                <div className="Addbook-inputarea">
                  <label>Size : </label>
                  {/* <input
                    required
                    className="sort-input"
                    type="text"
                    onChange={handleinput}
                    name="Size"
                    value={bookdata.Size}
                  /> */}
                  <select
                    required
                    className="input"
                    type="text"
                    onChange={handleinput}
                    name="Size"
                    value={bookdata.Size}
                  >
                    <option value={""}>Select</option>
                    <option value={"Demi"}>Demi</option>
                    <option value={"Crown"}>Crown</option>
                    <option value={"D.Crown"}>D.Crown</option>
                    <option value={"Other"}>Other</option>
                  </select>
                </div>

                <div className="large-Addbook-inputarea">
                  <label> Discription : </label>
                  <textarea
                    required
                    className="large-input"
                    onChange={handleinput}
                    name="Discribption"
                    value={bookdata.Discribption}
                  ></textarea>
                </div>
              </div>
              {!edit && (
                <div className="btn-container">
                  <button onClick={handleadd} className="btn">
                    <AddOutlinedIcon />
                    Add
                  </button>
                </div>
              )}
              {edit && (
                <div className="btn-container">
                  <button onClick={handleedit} className="btn">
                    <EditNoteIcon />
                    Edit
                  </button>
                </div>
              )}
            </div>

            <div className="userlist-container">
              <h1>Added Book List</h1>
              <table ref={pdfref}>
                <thead>
                  <tr>
                    {/* <th>Front Image</th> */}
                    {/* <th>Back Image</th> */}

                    <th> ISBN </th>
                    <th>Book Name </th>

                    <th> Author Name </th>
                    {/* <th>Book Name Guj</th> */}
                    <th>Price </th>

                    <th> Subject </th>
                    <th> Category </th>

                    <th> Edit </th>
                    <th> Delete </th>
                  </tr>
                </thead>
                <tbody>
                  {booklist &&
                    booklist.map((i) => (
                      <tr>
                        {/* <td key={i.BookName}>
                          <img
                            className="image"
                            src={i.FrontImage}
                            onClick={() =>
                              (window.location.href = i.FrontImage)
                            }
                          />
                        </td> */}
                        {/* <td key={i.BookName}>
                          {" "}
                          <img
                            className="image"
                            onClick={() => (window.location.href = i.BackImage)}
                            src={i.BackImage}
                          />
                        </td> */}

                        <td key={i.ISBN}> {i.ISBN}</td>
                        <td key={i.BookName}> {i.BookName}</td>
                        <td key={i.AuthorName}> {i.AuthorName}</td>
                        {/* <td key={i.BookNameGuj}> {i.BookNameGuj}</td> */}
                        <td key={i.Price}> {i.Price}</td>
                        <td key={i.Subject}> {i.Subject}</td>
                        <td key={i.Category}> {i.Category}</td>
                        {/* <td key={i.Language}> {i.Language}</td> */}
                        {/* <td key={i.PublisherName}> {i.PublisherName}</td> */}
                        {/* <td key={i.Size}> {i.Size}</td> */}
                        {/* <td key={i.Weight}> {i.Weight}</td> */}
                        {/* <td key={i.Binding}> {i.Binding}</td> */}
                        {/* <td key={i.AuthorNameGuj}> {i.AuthorNameGuj}</td> */}
                        {/* <td key={i.Discribption}> {i.Discribption}</td> */}
                        <td
                          key={i._id}
                          onClick={() => showedit(i)}
                          className="edit"
                        >
                          <EditNoteIcon />
                        </td>
                        <td
                          key={i._id}
                          onClick={() => {
                            setdeletedilog(true);
                            setdeletedata(i);
                          }}
                          className="delete"
                        >
                          <DeleteForeverOutlinedIcon />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {/* <button onClick={downloadpdf} className="btn">
                <DownloadIcon />
                Download Pdf
              </button> */}
            </div>
          </>
        </div>

        {/* <Footer /> */}
      </div>
    </>
  );
}
export default Addbook;
