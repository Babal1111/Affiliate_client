import IconButton from '@mui/material/IconButton';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { serverEndpoint } from "../../config/config";
import { Modal } from 'react-bootstrap';
import { usePermission } from '../../rbac/permissions';
import AssesmentIcon from '@mui/icons-material/Assessment';
import { useNavigate } from 'react-router-dom';
function LinkDashboard() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [linksData, setLinksData] = useState([]);
    const [formData, setFormData] = useState({
        campaignTitle: '',
        originalUrl: '',
        category: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const permission = usePermission();
 
    const [loading,setLoading] = useState(false);
    const[searchItem,setSearchItem] = useState('');
    const [currentPage,setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10)
    const [totalCount, setTotalCount] = useState(0);
    // MUI DataGrid require array of fields as the sort model when using server side rendering
    // when using client-side paginatiop/sorting.filter/serach MUI takes care of every thing
    // abstracting the implimentation details, since we're now managing the data using serever
    //we need to manage everything and let data grid know
    const [sortModel, setSortModel] = useState([
        {field:'createdAt', sort:"dec"}
    ]);

    const handleModalShow = (isEdit, data = {}) => {
        if (isEdit) {
            setFormData({
                id: data._id,
                campaignTitle: data.campaignTitle,
                originalUrl: data.originalUrl,
                category: data.category
            });
        } else {
            setFormData({
                campaignTitle: '',
                originalUrl: '',
                category: ''
            });
        }
        setIsEdit(isEdit);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteModalShow = (linkId) => {
        setFormData({
            id: linkId
        });
        setShowDeleteModal(true);
    };

    const handleDeleteModalClose = () => {
        setShowDeleteModal(false);
    };

    const handleDeleteSubmit = async () => {
        try {
            await axios.delete(
                `${serverEndpoint}/links/${formData.id}`,
                { withCredentials: true });
            setFormData({
                campaignTitle: '',
                originalUrl: '',
                category: ''
            });
            fetchLinks();
        } catch (error) {
            setErrors({ message: 'Something went wrong, please try again' });
        } finally {
            handleDeleteModalClose();
        }
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let newErrors = {};
        let isValid = true;
        if (formData.campaignTitle.length === 0) {
            newErrors.campaignTitle = "Campaign Title is mandatory";
            isValid = false;
        }

        if (formData.originalUrl.length === 0) {
            newErrors.originalUrl = "Original URL is mandatory";
            isValid = false;
        }

        if (formData.category.length === 0) {
            newErrors.category = "Category is mandatory";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validate()) {
            const body = {
                campaign_title: formData.campaignTitle,
                original_url: formData.originalUrl,
                category: formData.category
            };
            const configuration = {
                withCredentials: true
            };
            try {
                if (isEdit) {
                    await axios.put(
                        `${serverEndpoint}/links/${formData.id}`,
                        body, configuration);
                } else {
                    await axios.post(
                        `${serverEndpoint}/links`,
                        body, configuration);
                }

                setFormData({
                    campaignTitle: '',
                    originalUrl: '',
                    category: ''
                });
                fetchLinks();
            } catch (error) {
                  const serverMessage =
    error.response && error.response.data && error.response.data.message;

                setErrors({ message: serverMessage || 'Something went wrong, please try again' });
            } finally {
                handleModalClose();
            }
        }
    };

    const fetchLinks = async () => {
        try {
            const sortField = sortModel[0]?.field || "createdAt";
            const sortOrder = sortModel[0]?.sort || "desc";
            const params = {
                currentPage: currentPage,
                sortField: sortField,
                sortOrder: sortOrder,
                pageSize:pageSize,
                searchItem:searchItem
           };
            
            const response = await axios.get(`${serverEndpoint}/links`, {
                withCredentials: true,
                params: params
            });
            setLinksData(response.data.data.links);
            setTotalCount(response.data.data.totalCount);
        } catch (error) {
            console.log(error);
            setErrors({ message: 'Unable to fetch links at the moment, please try again' });
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLinks();
    }, [currentPage,pageSize,sortModel,searchItem]);

    const columns = [
        { field: 'campaignTitle', headerName: 'Campaign', flex: 2 },
        {
            field: 'originalUrl', headerName: 'URL', flex: 3, renderCell: (params) => (
                <a
                    href={`${serverEndpoint}/links/r/${params.row._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {params.row.originalUrl}
                </a>
            ),
        },
        { field: 'category', headerName: 'Category', flex: 2 },
        { field: 'clickCount', headerName: 'Clicks', flex: 1 },
        {
            field: 'action', headerName: 'Action', flex: 1, sortable:false,enderCell: (params) => (
                <>
                    {permission.canEditLink && (
                        <IconButton>
                            <EditIcon onClick={() => handleModalShow(true, params.row)} />
                        </IconButton>
                    )}

                    {permission.canDeleteLink && (
                        <IconButton>
                            <DeleteIcon onClick={() => handleDeleteModalShow(params.row._id)} />
                        </IconButton>
                    )}
                    {permission.canViewLink && (
                        <IconButton>
                            <AssesmentIcon onClick={() => navigate(`/analytics/${params.row._id}`)} />
                        </IconButton>
                    )}
                    
                </>
            )
        },{
            field:'share',
            headerName: 'Share Affiliate Link',
            flex:'1.5',
            renderCell: (params)=>{
                const shareUrl = `${serverEndpoint}/links/r/${params.row._id}`;
                return (
                    <button className='btn btn-outline-primary btn-sm'
                     onClick={(e)=>{
                        navigator.clipboard.writeText(shareUrl); // will automaticaly copy to clipboard
                     }}>
                        Copy
                     </button>
                )
            }
        }
    ];

    return (
        <div className="container py-4">

            <div className="d-flex justify-content-between mb-3">
                <h2>Manage Affiliate Links</h2>
                {permission.canCreateLink && (
                    <button className='btn btn-primary btn-sm'
                        onClick={() => handleModalShow(false)}
                    >
                        Add
                    </button>
                )}

            </div>

            {errors.message && (
                <div className="alert alert-danger" role="alert">
                    {errors.message}
                </div>
            )}
            <div className='mb-2'>
                <input type="text" className="form-control" placeholder="Enter CampaignTitle, OriginalUrl or Categoty" 
                onChange={(e)=>{
                    setSearchItem(e.target.value);
                    setCurrentPage(0); //reset to first page
                }}></input>
            </div>

            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={linksData}
                    columns={columns}
                    initialState={{
                        pagination: {
                            // paginationModel: { pageSize: 20, page: 0 },
                            paginationModel: { pageSize: pageSize, page: currentPage },
                        },
                    }}
                
                    paginationMode="server"
                    pageSizeOptions={[2, 3, 4]}
                    onPaginationModelChange={(newPage)=>{
                        setCurrentPage(newPage.page);
                        setPageSize(newPage.pageSize);
                    }}

                    onPageSizeChange ={(newPageSize)=>{
                        setPageSize(newPageSize);
                        setCurrentPage(0); //reset to first page
                    }}
                    rowCount={totalCount}

                    sortingMode='server'
                    sortModel={sortModel}
                    onSortModelChange={(model)=>{
                        setSortModel(model);
                        setCurrentPage(0); //reset to first page
                    }}
                    disableRowSelectionOnClick
                    showToolbar
                    sx={{
                        fontFamily: 'inherit'
                    }}
                />
            </div>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEdit ? (<>Edit Link</>) : (<>Add Link</>)}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="campaignTitle" className="form-label">Campaign Title</label>
                            <input
                                type="text"
                                className={`form-control ${errors.campaignTitle ? 'is-invalid' : ''}`}
                                id="campaignTitle"
                                name="campaignTitle"
                                value={formData.campaignTitle}
                                onChange={handleChange}
                            />
                            {errors.campaignTitle && (
                                <div className="invalid-feedback">
                                    {errors.campaignTitle}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="originalUrl" className="form-label">Original URL</label>
                            <input
                                type="text"
                                className={`form-control ${errors.originalUrl ? 'is-invalid' : ''}`}
                                id="originalUrl"
                                name="originalUrl"
                                value={formData.originalUrl}
                                onChange={handleChange}
                            />
                            {errors.originalUrl && (
                                <div className="invalid-feedback">
                                    {errors.originalUrl}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <input
                                type="text"
                                className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            />
                            {errors.category && (
                                <div className="invalid-feedback">
                                    {errors.category}
                                </div>
                            )}
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this link?
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => setShowDeleteModal()}>
                        Cancel
                    </button>
                    <button className="btn btn-danger" onClick={handleDeleteSubmit}>
                        Delete
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default LinkDashboard;