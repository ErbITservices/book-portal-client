import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import { useReactToPrint } from "react-to-print";
import DownloadIcon from "@mui/icons-material/Download";
import { userRequest } from "../../axiosReqMethods";
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';

function BookData({User_id,Scheme_name, backtodashboard}) {


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
              <div ref={pdfref}>
                
              <div className="pdf-info"> <h2>Book List Of {Scheme_name}</h2> 
              <h2>User Name {localStorage.getItem("username")}</h2></div>
              <table >
                
                <thead>
                  <tr>
                    {/* <th>Front Image</th> */}
                    {/* <th>Back Image</th> */}
                    
                    <th> ISBN</th>
                    <th>Book Name</th>
                    
                    <th> AuthorName</th>
                    <th> PublisherName</th>
                    {/* <th>Book Name Guj</th> */}
                    <th>Price</th>
                    <th> Category</th>
                    
                    <th> Subject</th>
                    <th> Language</th>
                    <th> Size</th>
                    <th> Weight</th>
                    <th> Binding</th>
                  </tr>
                </thead>
                <tbody>
                  {booklist &&
                    booklist.map((i) => (
                      <tr>
                       
                       <td key={i.ISBN}> {i.ISBN}</td>
                        <td key={i.BookName}> {i.BookName}</td>
                        <td key={i.AuthorName}> {i.AuthorName}</td>
                        <td key={i.PublisherName}> {i.PublisherName}</td>
                        <td key={i.Price}> {i.Price}</td>
                        <td key={i.Category}> {i.Category}</td>
                        <td key={i.Subject}> {i.Subject}</td>
                        <td key={i.Language}> {i.Language}</td>
                        <td key={i.Size}> {i.Size}</td>
                        <td key={i.Weight}> {i.Weight}</td>
                        <td key={i.Binding}> {i.Binding}</td>
                        
                       
                      </tr>
                    ))}
                </tbody>
              </table>
              </div>
              
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
              
            </div></>
  )
}
export default BookData;