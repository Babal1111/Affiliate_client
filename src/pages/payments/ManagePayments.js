// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { CREDIT_PACKS } from '../../config/payments';
// import { serverEndpoint } from '../../config/config';
// import { SET_USER } from '../../redux/user/actions';
// import { useDispatch } from 'react-redux';
// import { color } from '@mui/system';



// function ManagePayments(){
//     const user = useSelector(state => state.userDetails);
//     const [errors,setErrors]= useState(null);
//     const [message,setMessage] = useState(null);
//     const [loading,setLoading] = useState(false);
//     const dispatch = useDispatch();

//     const handlePayment = async (credits) =>{
//         try{
//             setLoading(true);
//             const createOrderResponse = await axios.post(`${serverEndpoint}/payments/create-order`,{
//                 credits:credits
//             },{
//                 withCredentials: true
//             });

//             const order = createOrderResponse.data.order;

//             const options = {
//                 key: process.env.REACT_APP_RAZORPAY_KEY_ID,
//                 amount: order.amount,
//                 currency: order.currency,
//                 name: 'Affiliate++',
//                 description: `${credits} credits pack`,
//                 order_id : order.id,
//                 theme:{
//                     color:  '#3399cc'
//                 },
//                 handler: async (payment) =>{
//                     try{
//                         const response = await axios.post(`${serverEndpoint}/payments/verify-order`,{
//                             razorpay_order_id: payment.razorpay_order_id,
//                             razorpay_payment_id:
//                             payment.razorpay_payment_id,
//                             razorpay_signature:
//                             payment.razorpay_signature,
//                             credits


//                         },{
//                             withCredentials: true
//                         });
//                         console.log(response.data.user);

//                         dispatch({
//                             type: SET_USER,
//                             payload: response.data.user
//                         });
//                         setMessage('Creditd added successfully');

//                     }catch(error){
//                         console.error(error);
//                         setErrors({
//                             message: 'Unable to verify payment, if the money gets deducted, reahtout to customer service'
//                         });
//                     }
//                 },
//             };
//             const razorpayPopup = new window.Razorpay(options);
//             razorpayPopup.open();


//         }
//         catch(error){
//             console.log(error);
//             setErrors({
//                 message: 'Unable to create order,please try again'
//             })

//         }
//         finally{
//             setLoading(false);
//         }
//     }
//     return(
//        <div className="container py-5">
//         {message && (<div className='alert alert-success' role='alert'>{message}</div>)}
        
//         {errors&&(<div className="alert alert-danger"
// role="alert"> {errors.message}</div>)}

//             <h2>ManagePayments</h2>

//             <p><strong>Credit Balance:</strong>{user.credits}</p>
//             <div className='row'>
//         {CREDIT_PACKS.map((credit) => (
//   <div key={credit} className='col-auto border m-2 p-2'>
//     <h4>Credits: {credit}</h4>
//     <p>Buy {credit} Credits for Rs {credit}</p>
//     <button className='btn btn-outline-primary' onClick={() => handlePayment(credit)} disabled={loading}>
//       Pay
//     </button>
//   </div>
// ))}

//             </div>

//        </div>
//     );
// }

// export default ManagePayments;


//// 
// code after adding sbscriptions
import { useSelector } from  "react-redux";
import PurchseCredits from "./PurchaseCredits";
import Subscription from "./Subscription";
function ManagePayments(){
    const userDetails = useSelector((state)=>state.userDetails);

    if(userDetails.subscription?.status === 'active'){
        return <Subscription/>
    }
    else{
        return <PurchseCredits/>;
    }
}


export default ManagePayments;