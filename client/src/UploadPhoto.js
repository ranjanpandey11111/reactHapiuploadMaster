import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './UploadPhoto.css'
import Cropper from 'react-cropper';
import { Modal } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import 'cropperjs/dist/cropper.css';

class UploadPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: '',
            showDialog: false,
            showImg: false,
            cropResult: null,
        }
    }
    showModal = () => {
        this.setState({
            showDialog: true,
            cropResult: null,
            imgSrc: '',
            showImg: false,
        });
    }
    handleOk = (e) => {
        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }
        this.setState({
            cropResult: this.cropper.getCroppedCanvas().toDataURL(),
            showDialog: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
            showDialog: false,
        });
    }
    handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let file = e.target.files[0];
			console.log("file",file);
            let reader = new FileReader();
            reader.onload = (evt) => {
                this.setState({ imgSrc: evt.target.result })
            }
            reader.readAsDataURL(file);
        }
        this.setState({ showImg: true })
    }
    render() {
        return (
            <div>
                {this.state.cropResult ?
                    <img src={this.state.cropResult} className='upload-photo-root' onClick={this.showModal} /> :
                    <div className='upload-photo-root' onClick={this.showModal}>
                        <Modal title="photo upload" visible={this.state.showDialog}
                            onOk={this.handleOk} onCancel={this.handleCancel}  okText="Upload"
                            cancelText= 'Cancel'>
                            <p className="avatar_info">Add your profile pic</p>
                            <span className='upload-photo-button' style={this.state.showImg ? { display: 'none' } : { display: 'block' }}>
                                <input type='file' className='upload-photo-input' onChange={this.handleChange} />
                            </span>
                            <Cropper
                                style={this.state.showImg ? { display: 'block' } : { display: 'none' }}
                                className='upload-photo-img'
                                aspectRatio={1 / 1}
                                preview=".upload-photo-preview"
                                guides={false}
                                src={this.state.imgSrc}
                                ref={cropper => { this.cropper = cropper; }}
                            />
                            <div>
                                <div>
                                    <h3 className='upload-photo-preview-title'>upload photo</h3>
                                    <div className="upload-photo-preview" />
                                    <label className='upload-photo-preview-info'>125X125</label>
                                </div>
                            </div>
                        </Modal>
                    </div>}
            </div>

        );
    }
}

UploadPhoto.propTypes = {
    style: PropTypes.object
};

export default UploadPhoto;