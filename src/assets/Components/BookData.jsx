import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import { useReactToPrint } from "react-to-print";
import DownloadIcon from "@mui/icons-material/Download";
import { userRequest } from "../../axiosReqMethods";
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';

function BookData({User_id,Scheme_name, backtodashboard ,submiteddate}) {


  const [loader, setloader] = useState(false);

  const [booklist, setbooklist] = useState([]);
  const pdfref = useRef();
 const downloadpdf = useReactToPrint({
   contentRef: pdfref,
   documentTitle: `${User_id+Scheme_name}`,

   
 });
  useEffect(() => {
    const dataget = async () => {
      setloader(true)
      console.log(
        `/api/v1/bookeEntry/getBook/${User_id}/${Scheme_name}`);
      
      try {
       
        
        const res2 = await userRequest.get(
          `/api/v1/bookeEntry/getBook/${User_id}/${Scheme_name}`
        );
        
        console.log(res2.data.bookEntry);
        
          
        setbooklist(res2.data.bookEntry);
        
  
        
        
      } catch (error) {
        
      setloader(false);
        console.log(error);
      }
      setloader(false);
    };
    dataget();
  }, []);
  return(
    <>
    <div className="userlist-container">
    {loader && <Loader />}
              {/* <h1>Added Book List</h1> */}
              <div className="btn-container">
              <button onClick={()=>{
                backtodashboard()
              }} className="back btn">
                <KeyboardBackspaceOutlinedIcon />
                DashBoard
              </button>
                <button onClick={downloadpdf} className="btn">
                <DownloadIcon />
                Download Pdf
              </button>
              </div>
              <div ref={pdfref}>
              <h1>Book List Of {Scheme_name}</h1> 
              <div className="pdf-info"> 
              <h3>User Name {localStorage.getItem("username")}</h3>
              <h3>{submiteddate.slice(0,10)}</h3>
              </div>
              <table className="data-table" >
                
                <thead>
                <tr>
                  <th> Sr no</th>
                  <th> ISBN</th>
                  <th> Book Name</th>
                  <th> Book Name (Guj)</th>
                  <th> Author Name</th>
                  <th> Author Name (Guj)</th>
                  <th> Publisher Name</th>
                  <th> Price</th>
                  <th> Pages</th>
                  <th> Size</th>
                  <th> Weight</th>
                  <th> Binding</th>
                  <th> Language</th>
                  <th> Category</th>
                  <th> Subject</th>
                  <th> Pub Year</th>
                  <th> Scheme Name</th>
                  {/* <th> Discription</th> */}
                </tr>
                </thead>
                <tbody>
                  {booklist &&
                    booklist.map((i , index) => (
                      <tr>
                      <td key={i.index + 1}> {index + 1}</td>
                      <td key={i.ISBN}> {i.ISBN}</td>
                      <td key={i.BookName}> {i.BookName}</td>
                      <td key={i.BookNameGuj}> {i.BookNameGuj}</td>
                      <td key={i.AuthorName}> {i.AuthorName}</td>
                      <td key={i.AuthorNameGuj}> {i.AuthorNameGuj}</td>
                      <td key={i.PublisherName}> {i.PublisherName}</td>
                      <td key={i.Price}> {i.Price}</td>
                      <td key={i.BookPages}> {i.BookPages}</td>
                      <td key={i.Size}> {i.Size}</td>
                      <td key={i.Weight}> {i.Weight}</td>
                      <td key={i.Binding}> {i.Binding} </td>
                      <td key={i.Language}> {i.Language} </td>
                      <td key={i.Category}> {i.Category} </td>
                      <td key={i.Subject}> {i.Subject} </td>
                      <td key={i.PubYear}> {i.PubYear} </td>
                      <td key={i.schemename}> {i.schemename} </td>
                      {/* <td key={i.Discribption
}> {i.Discribption
}</td> */}
                    </tr>
                    ))}
                </tbody>
              </table>
              </div>
              
              
              
            </div></>
  )
}
export default BookData;