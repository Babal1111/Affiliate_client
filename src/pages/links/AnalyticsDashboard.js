import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverEndpoint } from "../../config/config";
import { useState } from "react";


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
    useEffect(()=>{
        fetchLinkAnalytics();
    },[]);
    return(
        <div className="container py-5">

        </div>
    )
}

export default AnalyticsDashboard;