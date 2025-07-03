const { useSelector } = require("react-redux");

function ManagePayments(){
    const user = useSelector(state => state.userDetails);

    return(
        <div className="container">
            <h2>ManagePayments</h2>
            <p><strong>credits balance</strong></p>
            <div className="row">
                <div className="col-auto">
                    <h4>10 credits</h4>
                    <p>buy 10 credits for 100</p>
                    
                </div>
            </div>
        </div>
    )
}