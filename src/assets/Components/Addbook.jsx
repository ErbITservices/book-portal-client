import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useEffect, useRef, useState } from "react";
import { userRequest } from "../../axiosReqMethods";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Loader from "./Loader";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useReactToPrint } from "react-to-print";
import DownloadIcon from "@mui/icons-material/Download";

function Addbook({ schemename }) {

  const [categorylist, setcategorylist] = useState();
  const [booklist, setbooklist] = useState([]);
  const [schemedata, setschemedata] = useState();
  const [totalprice, settotalprice] = useState(0);
  const [loader, setloader] = useState(false);
  const [edit, setedit] = useState(false);

  const email = localStorage.getItem("email");
  const User_id = localStorage.getItem("user_id");
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
    FrontImage: "",
    BackImage: "",
    schemename: schemename,
    Email: email,
    userId: User_id,
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
        const res1 = await userRequest.get(
          `/api/v1/CategoryName/getCategoryName`
        );
        setcategorylist(res1.data.Category);
        console.log("loading category");
        const res3 = await userRequest.get(
          `/api/v1/scheam/getOneScheam/${schemename}`
        );
        setschemedata(res3.data.Scheam);
        console.log("loading scheme");
        
        const res2 = await userRequest.get(
          `/api/v1/bookeEntry/getBook/${localStorage.getItem(
            "user_id"
          )}/${schemename}`
        );
        
        console.log(res2.data.bookEntry);
        
        if (res2.data.bookEntry) {
          
        setbooklist(res2.data.bookEntry);
        }
        
        console.log(schemedata);
        
         
        console.log(res3.data.Scheam);
        
        let count = 0;
        for (let index = 0; index < res2.data.bookEntry.length; index++) {
          count += Number(res2.data.bookEntry[index].Price);
        }
        settotalprice(count)
        
      } catch (error) {
        
      setloader(false);
        console.log(error);
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
    if (name === "FrontImage") {
      const file = e.target.files[0];
      const filereader = new FileReader();
      filereader.readAsDataURL(file);
      filereader.onload = () => {
        setbookdata((p) => ({ ...p, FrontImage: filereader.result }));
      };
    } else if (name === "BackImage") {
      const file = e.target.files[0];
      const filereader = new FileReader();
      filereader.readAsDataURL(file);
      filereader.onload = () => {
        setbookdata((p) => ({ ...p, BackImage: filereader.result }));
      };
    }
    console.log(bookdata);
  }
  async function handlesubmit() {
    if (Number(schemedata.max_book_number) <= booklist.length) {
         alert("You Reached Maximum book Limit");
    }
    else if (Number(totalprice) >= Number(schemedata.total_book_price)) {
      alert("You Reached Maximum price Limit Of Set");
    }
    else if (Number(bookdata.Price) < Number(schemedata.book_price)) {
      alert("Your Book Can Not Be Cheaper Than Minimum Book Price");
    }
    else if (Number(bookdata.Price) > Number(schemedata.max_book_price)) {
      alert("Your Book Can Not Be Expensive Than Maximum Book Price");
    }
    else if (Number(bookdata.ISBN) < 13 && Number(bookdata.ISBN) > 13) {
      alert("Please Enter 13 Digit ISBN Number");
    } else {
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
      let count = 0;
      for (let index = 0; index < res2.data.bookEntry.length; index++) {
        count += Number(res2.data.bookEntry[index].Price);
      }
      settotalprice(count);
      if (res.status === 200) {
        setbookdata({
          ISBN: "",
          BookName: "",
          BookNameGuj: "",
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
          FrontImage: "",
          BackImage: "",
          FImage: "",
          BImage: "",
          BookPages: "",
          userId: "",
        });
      }

      setloader(false);
    }

   
  }
  async function handledelete(i) {
    // list.remove(i);
    setloader(true)
    const res = await userRequest.delete(`/api/v1/bookeEntry/delete/${i._id}`);
    console.log(res);
     const res2 = await userRequest.get(
       `/api/v1/bookeEntry/getBook/${localStorage.getItem(
         "user_id"
       )}/${schemename}`
     );

     console.log(res2.data.bookEntry);

     if (res2.data.bookEntry) {
       setbooklist(res2.data.bookEntry);
     }
    setloader(false);

  }
  const[editdata,seteditdata] = useState()
  function showedit(i) {
    console.log(i);
    seteditdata(i._id)
    setedit(true);
    setbookdata(i);
  }
  async function handleedit(i) {
    // list.remove(i);
    
    setloader(true);
    const res = await userRequest.put(`/api/v1/bookeEntry/update/${editdata}`, {bookdata});
    console.log(res);
    setedit(false)
    setbookdata({
      ISBN: "",
      BookName: "",
      BookNameGuj: "",
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
      FrontImage: "",
      BackImage: "",
      FImage: "",
      BImage: "",
      BookPages: "",
      userId: "",
    });
     const res2 = await userRequest.get(
       `/api/v1/bookeEntry/getBook/${localStorage.getItem(
         "user_id"
       )}/${schemename}`
     );

     console.log(res2.data.bookEntry);

     if (res2.data.bookEntry) {
       setbooklist(res2.data.bookEntry);
     }
    setloader(false);
  }
  return (
    <>
      <div className="main-container">
        {/* <Navbar /> */}
        {loader && <Loader />}

        <div className="addbook-main-container">
          <>
            <div className="Addbook-container">
              <h1>Book Entry</h1>
              <div className="book-info">
                {booklist && schemedata && (
                  <>
                    <h4>
                      Total Book Added {booklist.length} Out Of{" "}
                      {schemedata.max_book_number}
                    </h4>
                    <h4>Total Price Of Added Books {totalprice} </h4>
                    <h4>
                      Min Value Of Book Can Be Added {schemedata.book_price}
                    </h4>
                    <h4>
                      Max Value Of Book Can Be Added {schemedata.max_book_price}
                    </h4>
                  </>
                )}
              </div>
              <form className="Addbook-inputarea">
                <label>ISBN</label>
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
              </form>
              <div className="Addbook-inputarea">
                <label>Size</label>
                <input
                  required
                  className="input"
                  type="text"
                  onChange={handleinput}
                  name="Size"
                  value={bookdata.Size}
                />
              </div>
              <div className="Addbook-inputarea">
                <label>Book Name</label>
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
                <label>Binding</label>
                <input
                  required
                  className="input"
                  onChange={handleinput}
                  type="text"
                  name="Binding"
                  value={bookdata.Binding}
                />
              </div>
              <div className="Addbook-inputarea">
                <label>Book Name (Guj) </label>
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
                <label>Weight </label>
                <input
                  required
                  className="input"
                  type="text"
                  onChange={handleinput}
                  name="Weight"
                  value={bookdata.Weight}
                />
              </div>
              <div className="Addbook-inputarea">
                <label>Number Of Book-Pages </label>
                <input
                  required
                  className="input"
                  type="text"
                  onChange={handleinput}
                  name="BookPages"
                  value={bookdata.BookPages}
                />
              </div>
              <div className="Addbook-inputarea">
                <label>Author Name </label>
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
                <label>Language </label>
                <input
                  required
                  className="input"
                  type="text"
                  onChange={handleinput}
                  name="Language"
                  value={bookdata.Language}
                />
              </div>

              <div className="Addbook-inputarea">
                <label>Author Name (Guj) </label>
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
                <label>Subject </label>
                <input
                  required
                  className="input"
                  type="text"
                  onChange={handleinput}
                  name="Subject"
                  value={bookdata.Subject}
                />
              </div>

              <div className="Addbook-inputarea">
                <label> Publisher Name </label>
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
                <label> Pub Year </label>
                <input
                  required
                  className="input"
                  type="text"
                  onChange={handleinput}
                  name="PubYear"
                  value={bookdata.PubYear}
                />
              </div>
              <div className="Addbook-inputarea">
                <label> Price </label>
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
                <label> Category </label>
                <select
                  required
                  className="input"
                  onChange={handleinput}
                  name="Category"
                  value={bookdata.Category}
                >
                  <option>Select</option>
                  {categorylist &&
                    categorylist.map((i) => (
                      <option key={i.CategoryName}>{i.CategoryName}</option>
                    ))}
                  <option>mihir</option>
                </select>
              </div>
              <div className="Addbook-inputarea">
                <label> Discription </label>
                <textarea
                  required
                  className="input"
                  onChange={handleinput}
                  name="Discribption"
                  value={bookdata.Discribption}
                ></textarea>
              </div>
              <div className="Addbook-inputarea">
                <label> Front Image </label>

                <input
                  required
                  accept="image/jpeg, image/png"
                  name="FrontImage"
                  type="file"
                  className="input"
                  // style={{ display: "none" }}
                  onChange={(e) => handleinput(e)}
                />
              </div>
              <div className="Addbook-inputarea">
                <label> Back Image </label>
                <input
                  required
                  accept="image/jpeg, image/png"
                  name="BackImage"
                  type="file"
                  className="input"
                  // style={{ display: "none" }}
                  onChange={(e) => handleinput(e)}
                />
              </div>
            </div>
            {!edit && (
              <button onClick={handlesubmit} className="btn">
                <AddOutlinedIcon />
                Add
              </button>
            )}
            {edit && (
              <button onClick={handleedit} className="btn">
                <AddOutlinedIcon />
                Edit
              </button>
            )}

            <div className="userlist-container">
              <h1>Added Book List</h1>
              <table ref={pdfref}>
                <thead>
                  <tr>
                    <th>Front Image</th>
                    <th>Back Image</th>
                    <th>Book Name</th>
                    <th>Book Name Guj</th>
                    <th>Price</th>
                    <th> ISBN</th>
                    <th> Category</th>
                    <th> Language</th>
                    <th> PublisherName</th>
                    <th> Size</th>
                    <th> Subject</th>
                    <th> Weight</th>
                    <th> Binding</th>
                    <th> AuthorName</th>
                    <th> AuthorNameGuj</th>
                    <th> Discribption</th>
                    <th> Edit</th>
                    <th> Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {booklist &&
                    booklist.map((i) => (
                      <tr>
                        <td key={i.BookName}>
                          <img
                            className="image"
                            src={i.FrontImage}
                            onClick={() =>
                              (window.location.href = i.FrontImage)
                            }
                          />
                        </td>
                        <td key={i.BookName}>
                          {" "}
                          <img
                            className="image"
                            onClick={() => (window.location.href = i.BackImage)}
                            src={i.BackImage}
                          />
                        </td>
                        <td key={i.BookName}> {i.BookName}</td>

                        <td key={i.BookNameGuj}> {i.BookNameGuj}</td>
                        <td key={i.Price}> {i.Price}</td>
                        <td key={i.ISBN}> {i.ISBN}</td>
                        <td key={i.Category}> {i.Category}</td>
                        <td key={i.Language}> {i.Language}</td>
                        <td key={i.PublisherName}> {i.PublisherName}</td>
                        <td key={i.Size}> {i.Size}</td>
                        <td key={i.Subject}> {i.Subject}</td>
                        <td key={i.Weight}> {i.Weight}</td>
                        <td key={i.Binding}> {i.Binding}</td>
                        <td key={i.AuthorName}> {i.AuthorName}</td>
                        <td key={i.AuthorNameGuj}> {i.AuthorNameGuj}</td>
                        <td key={i.Discribption}> {i.Discribption}</td>
                        <td
                          key={i._id}
                          onClick={() => showedit(i)}
                          className="edit"
                        >
                          <EditNoteIcon />
                        </td>
                        <td
                          key={i._id}
                          onClick={() => handledelete(i)}
                          className="delete"
                        >
                          <DeleteForeverOutlinedIcon />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <button onClick={downloadpdf} className="btn">
                <DownloadIcon />
                Download Pdf
              </button>
            </div>
          </>
        </div>

        {/* <Footer /> */}
      </div>
    </>
  );
}
export default Addbook;
