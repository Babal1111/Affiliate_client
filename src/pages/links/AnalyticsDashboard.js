import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverEndpoint } from "../../config/config";
import { useState } from "react";
import {DataGrid} from "@mui/x-data-grid";
import {Bar,Pie} from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css" //fordatepicker we also need to import its css which is also provided by the library itself
// core javaScrip library (not specific to react) for rendering charts
import {
    Chart as ChartJs,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from 'chart.js';

ChartJs.register(
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend,

)
const formDate = (isoDateString)=>{
    if(!isoDateString) return ' ';

    try {
        const date = new Date(isoDateString);
        // july 10,2025 this format

        return new Intl.DateTimeFormat('en-US',{
            year:'numeric',
            month:'long',
            day:'numeric'
        }).format(date);
        
    } catch (error) {
        console.log(error);
        return '';
        
    }
}

function AnalyticsDashBoard(){
    const {linkId} = useParams();
    const navigate = useNavigate();

    // since we want data when the component is first rendered we are going to use use effect
    const [analyticsData,setAnalyticsData] = useState([]);
    const [fromDate,setFromDate] = useState(null); // def val null as from and to are optionals
    const [toDate,setToDate] = useState(null); 
    const fetchLinkAnalytics = async()=>{
        try {
            const response = await axios.get(`${serverEndpoint}/links/analytics`,{
                params:{
                    linkId:linkId,
                    // lhs, we are sending
                    // left is the should match with server, rigth is the value
                    // se the exact same vals of lhs in server api
                    // from and to are  optionals thats y we did'nt defined here

                    // next step: now we have defined state vrbls to null as optional
                    // we can now write from and to

                    from:fromDate, //lhs exact as in server, we are sending that to sever
                    to:toDate,

                },
                withCredentials: true
            });
            // next step
            // now we need to store the data incoming in some state variable,
            // thats why we define a state variable, analuticsData (now we set that)
            setAnalyticsData(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
            // nav to error page if we r not able to fetch link analytics
            // that is  becouse there is no point rendering the component if 
            // we dont have any data
            navigate('/error');
            
        }
    };

    const groupBy = (key)=>{  // we can pass any key we want to group here eg city, browser
        return analyticsData.reduce((acc,item)=>{ // acc is empty initaly
            const label = item[key] || "unknown";
            acc[label] = (acc[label] || 0)+1;
            return acc;
        },{});
    };

    // sample output [ {jalandhar:1} , {panipat:2}]
    const clicksByCity = groupBy('city');
    const clicksByBrowser = groupBy('browser');  

    const columns = [
        {field: 'ip',headerName:'IP Address', flex:1},
        {field:'city',headerName:'City',flex:1},
        {field:'country',headerName:'Country',flex:'1'},
        {field:'browser',headerName:'Browser',flex:''},
        {field:'device',headerName:'Device',flex:'1'},
        {field:'isp',headerName:'ISP',flex:'1'},
        {field:'clickedAt',headerName:'Click Date',flex:'1',renderCell:(params)=>(
            <>
            {fromDate(params.row.clickedAt)} 
            {/*? why */}
            </>
        )},
    ];

    useEffect(()=>{ // step:1
        fetchLinkAnalytics();
    },[fromDate,toDate]);
    return(
        <div className="container py-5">
            <h1>  AnalyticsDashBoard</h1>

            {/* chart. here, filters from and to date */}
            < div className="row mb-4 mx-0 border py-3 rounded">
            <h5>Filters</h5>
            <div className="col-md-2">
            <DatePicker
            selected={fromDate}
            onChange={(date)=>setFromDate(date)}
            className="form-control"
            placeholderText="from (date): "
            />
            </div>
            <div className="col-md-2">
            <DatePicker
            selected={toDate}
            onChange={(date)=>setToDate(date)}
            className="form-control"
            placeholderText="To (date): "
            />            
            </div>
            </div>
            <div className="row mb-4 mx-0 py-3 rounded">
                <div className="col-md-8 p-3 rounded mt-2">
                    <h5>Clicks By City</h5>
                    <hr/>
                    <Bar 
                    data={{
                        labels: Object.keys(clicksByCity),
                        datasets:[
                            {
                                label: 'Clicks',
                                data: Object.values(clicksByCity),
                                backgroundColor:'rgba(54,162,235,0.6)'
                            }
                        ]
                    }}
                    options={{responsive: true}}
                    />
                </div>
                <div className="col-md-4 p-3 rounded mt-2">
                    <h5>Clicks By Browser</h5>
                    <hr/>
                    <Bar 
                    data={{
                        labels: Object.keys(clicksByBrowser),
                        datasets:[
                            {
                                // label: 'Clicks',
                                data: Object.values(clicksByBrowser),
                                backgroundColor:[
                                    '#FF6384',
                                    '#36A2EB',
                                    '#FFCE56',
                                    '#FF6384',
                                    '#FF6384',
                                    '#FF6384',
                                ]
                            }
                        ]
                    }}
                    options={{responsive: true}}
                    />
                </div>
            </div>
            <DataGrid
            getRow = {(row)=> row._id}
            rows = {analyticsData}
            columns = {columns}
            initialState = {{
                pagination:{paginationModel:{pageSize:20,page:0}}
            }}
            pageSizeOptions = {[20,50,100]}
            disableRowSelectionOnClick
            showToolbar
            sx={{
                fontFamily:'inherit'
            }}
            />
        </div>
    )
}

export default AnalyticsDashBoard;