import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Button, Radio, Select, Typography, DatePicker, notification, message } from 'antd';
import TextArea from '../../../../node_modules/antd/lib/input/TextArea';
import Axios from 'axios';
import uuid from 'uuid'

import {
    cargotypeValues, originValues,
    shipmentDestination,
    periodOfTime,
    auctionList,
    warehouseList,
    measurement
} from './data/data'

function InlandRequest(props) {

    const [seeWarehouse, setSeeWarehouse] = useState(false)
    const [seeAunction, setSeeAunction] = useState(false)
    const [seeZip, setSeeZip] = useState(false)
    const [seeZip2, setSeeZip2] = useState(false)
    const [showVehicle, setShowVehicle] = useState(true)
    const [showDrycargo, setShowDrycargo] = useState(false)
    const [cargoType, setCargoType] = useState('vehicle')
    const [origination, setOrigin] = useState()
    const [destination, setDestination] = useState()
    const [pickUptime, setPickUptime] = useState()
    const [period, setPeriod] = useState()
    const [description, setDescription] = useState()

    //========VEHICLE CARGO TYPE==============

    const [vin, setVin] = useState()
    const [year, setYear] = useState()
    const [make, setMake] = useState()
    const [model, setModel] = useState()
    const [buyer, setBuyer] = useState()
    const [vehicleMeasurement, setMeasurement] = useState()
    const [height, setheight] = useState()
    const [dimension, setDimension] = useState()
    const [width, setWidth] = useState()
    const [weight, setWeight] = useState()
    const [lot, setLot] = useState()

    //===========DRY CARGO TYPE================

    const [po, setPO] = useState()
    const [destination2, setPODestination] = useState()
    const [lot2, setPOlot] = useState()
    const [buyer2, setPOBuyer] = useState()
    const [measurement2, setPOMeasurement] = useState()
    const [height2, setPOheight] = useState()
    const [dimension2, setPODimension] = useState()
    const [width2, setPOWidth] = useState()
    const [weight2, setPOWeight] = useState()

    //=================VENDORS AND CONSIGNEE API ==================================
    const [Vendor, setVendor] = useState()
    const [Consignee, setConsignee] = useState()
    const [VendorList, setVendorList] = useState([])
    const [ConsigneeList, setConsigneeList] = useState([])

    console.log(Vendor)

    useEffect(() => {
        Axios.get('/api/users/vendors')
            .then(response => {
                if (response.data.success) {
                    setVendorList(response.data.vendors)
                }
            })

        Axios.get('/api/users/consignees')
            .then(response => {
                if (response.data.success) {
                    setConsigneeList(response.data.consignees)
                }
            })
    }, [])


    const VendorCompany = VendorList.map((Item, index) => {
        return <Select.Option key={index} value={Item.UI + " " + Item.Company}> {Item.Company} </Select.Option>
    })
    const handleVendors = (value) => {
        setVendor(value)

    }

    const ConsigneeCompany = ConsigneeList.map((Item, index) => {
        return <Select.Option key={index} value={Item.UI + " " + Item.Company}> {Item.FirstName + " " + Item.LastName + " " + "passport" + " " + Item.UI} </Select.Option>
    })
    const handleConsignees = (value) => {
        setConsignee(value)

    }

    //===============================================

    const CargoType = cargotypeValues.map((item, index) => {
        return <Select.Option key={index} value={item}>{item}</Select.Option>
    })

    const Measurement = measurement.map((item, index) => {
        return <Select.Option key={index} value={item}>{item}</Select.Option>
    })

    const Origin = originValues.map((item, index) => {
        return <Radio key={index} value={item}>{item}</Radio>
    })

    const Destination = shipmentDestination.map((item, index) => {
        return <Radio key={index} value={item}>{item}</Radio>
    })

    const Period = periodOfTime.map((item, index) => {
        return <Select.Option key={index} value={item}>{item}</Select.Option>
    })

    const Auctions = auctionList.map((item, index) => {
        return <Select.Option key={index} value={item}>{item}</Select.Option>
    })

    const Warehouse = warehouseList.map((item, index) => {
        return <Select.Option key={index} value={item}>{item}</Select.Option>
    })

    const handlePOmeasurement = (value) => {
        setPOMeasurement(value)
    }

    const handleMeasurement = (value) => {
        setMeasurement(value)
    }

    const handleDate = (event) => {
        const value = (event._d.getDate() + "-" + (event._d.getMonth() + 1) + "-" + event._d.getFullYear())
        setPickUptime(value.toString())
    }

    const handlePeriod = (value) => {
        setPeriod(value)
    }

    const handleAuction = (value) => {
        setOrigin(value)
    }

    const handleWarehouse = (value) => {
        setDestination(value)
    }



    const handleInput = (event) => {
        const name = event.target.name
        const value = event.target.value

        if (name === 'ZIP1') setOrigin(value + " ZIP")
        else if (name === 'ZIP2') setDestination(value + " ZIP")
        else if (name === 'description') setDescription(value)
        else if (name === 'VIN') setVin(value)
        else if (name === 'year') setYear(value)
        else if (name === 'make') setMake(value)
        else if (name === 'model') setModel(value)
        else if (name === 'buyer') setBuyer(value)
        else if (name === 'lot') setLot(value)
        else if (name === 'height') setheight(value)
        else if (name === 'width') setWidth(value)
        else if (name === 'dimension') setDimension(value)
        else if (name === 'weight') setWeight(value)

        else if (name === 'PO') setPO(value)
        else if (name === 'cargoDestination') setPODestination(value)
        else if (name === 'PObuyer') setPOBuyer(value)
        else if (name === 'POlot') setPOlot(value)
        else if (name === 'POheight') setPOheight(value)
        else if (name === 'POwidth') setPOWidth(value)
        else if (name === 'POdimension') setPODimension(value)
        else if (name === 'POweight') setPOWeight(value)

    }


    const handleRadioButton = (event) => {
        const name = event.target.name
        const value = event.target.value

        if (name === 'origin') {

            if (value === 'auction') {
                setSeeAunction(true)
                setSeeZip(false)
            }

            else {
                setSeeAunction(false)
                setSeeZip(true)
            }
        }

        else if (name === 'destination') {

            if (value === 'warehouse') {
                setSeeWarehouse(true)
                setSeeZip2(false)
            }

            else {
                setSeeWarehouse(false)
                setSeeZip2(true)
            }
        }


    }

    const handleCargoType = (value) => {

        if (value === 'vehicle') {
            setShowVehicle(true)
            setShowDrycargo(false)
            setCargoType(value)
        }

        else if (value === 'dry cargo') {
            setShowVehicle(false)
            setCargoType(value)
            setShowDrycargo(true)
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        const variables = {
            writer: props.user.userData._id,
            uid: uuid(),
            cargo: cargoType,
            origination,
            Vendor,
            Consignee,
            destination,
            datevalue: pickUptime,
            period,
            description,
            vin,
            year,
            make,
            model,
            buyer,
            vehiclemeasurement: vehicleMeasurement,
            height,
            dimension,
            width,
            weight,
            lot,
            po,
            destination2,
            lot2,
            buyer2,
            measurement2,
            height2,
            dimension2,
            width2,
            weight2,
            typeOFRequest: "inland request"
        }
        await Axios.post('/api/shipping/InlandRequest', variables)
            .then(response => {
                if (response.data.success) {
                    message.success('Request successfully recorded');
                    //props.history.push('/inland-request');
                    window.location.reload(true)
                }

                else {
                    message.error('Failed to record request')
                }
            })

    }



    return (
        <div style={{ paddingTop: '69px' }}>
            <h2>General Information</h2>

            <form onSubmit={onSubmit}>
                <Row gutter={[16, 16]}>
                    <Col lg={6} md={6} xs={24} >
                        <Form.Item label="pick up avalability *" >
                            <DatePicker onChange style={{ width: '100%' }} onChange={handleDate} required />
                        </Form.Item>
                    </Col>
                    <Col lg={6} md={6} xs={24} >
                        <Form.Item label="period in time *" className="label">
                            <Select name="dimension" placeholder="select AM/PM" onChange={handlePeriod} required>
                                {Period}
                            </Select >
                        </Form.Item >
                    </Col>

                    <Col lg={3} md={3} xs={12} >


                        <Form.Item label="origin *" className="label">
                            <Radio.Group name="origin" onChange={handleRadioButton} required>
                                {Origin}
                            </Radio.Group>
                        </Form.Item >
                    </Col>

                    <Col lg={3} md={3} xs={12} >
                        <Form.Item label="destination *" className="label">
                            <Radio.Group name="destination" onChange={handleRadioButton} required>
                                {Destination}
                            </Radio.Group>
                        </Form.Item >
                    </Col>
                    <Col lg={3} md={3} xs={24} >
                        <Form.Item label="Vendor">
                            <Select defaultValue="Select Vendor" style={{ width: '100%' }} onChange={handleVendors}>
                                {VendorCompany}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={3} xs={24} >
                        <Form.Item label="Consignee">
                            <Select defaultValue="Select Consignee" style={{ width: '100%' }} onChange={handleConsignees}>
                                {ConsigneeCompany}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    {seeAunction &&
                        <Col lg={6} md={6} xs={24} >
                            <Form.Item className="label2">
                                <Select name="auctions" placeholder="select aunction" onChange={handleAuction} required>
                                    {Auctions}
                                </Select >
                            </Form.Item>
                        </Col>
                    }

                    {seeWarehouse &&
                        <Col lg={6} md={6} xs={24} >
                            <Form.Item className="label2">
                                <Select name="warehouse" placeholder="select warehouse" onChange={handleWarehouse} required>
                                    {Warehouse}
                                </Select >
                            </Form.Item>
                        </Col>
                    }

                    {seeZip2 &&
                        <Col lg={6} md={6} xs={24} >

                            <Form.Item className="label2">
                                <Input name="ZIP2" placeholder="enter destination zip" onChange={handleInput} required />
                            </Form.Item >

                        </Col>
                    }

                    {seeZip &&
                        <Col lg={6} md={6} xs={24} >
                            <Form.Item className="label2">
                                <Input name="ZIP1" placeholder="enter origin zip" onChange={handleInput} />
                            </Form.Item >
                        </Col>
                    }
                </Row>
                <br />

                <Form.Item label="description *" style={{ marginBottom: 0 }} className="label">
                    <Input
                        style={{ width: '100%' }}
                        name="description"
                        placeholder="year, make and model"
                        onChange={handleInput}
                        required
                    >
                    </Input>
                </Form.Item>
                <br />
                <h3>Cargo Information</h3>

                <Row gutter={[16, 16]}>
                    <Col lg={3} md={6} xs={24} >
                        <Form.Item className="label" style={{ fontWeight: 'bold', }}>
                            <Select name="pickType" defaultValue="vehicle" onChange={handleCargoType} required>
                                {CargoType}
                            </Select >
                        </Form.Item>
                    </Col>

                    {showVehicle &&
                        <div>
                            <Col lg={6} md={6} xs={24} >
                                <Form.Item className="label">
                                    <Input name="VIN" placeholder="enter #VIN" onChange={handleInput} required />
                                </Form.Item >
                            </Col>

                            <Col lg={3} md={6} xs={24} >
                                <Form.Item className="label">
                                    <Input name="year" placeholder="year" onChange={handleInput} required />
                                </Form.Item >
                            </Col>
                            <Col lg={3} md={6} xs={24} >
                                <Form.Item className="label">
                                    <Input name="make" placeholder="make" onChange={handleInput} required required />
                                </Form.Item >
                            </Col>
                            <Col lg={3} md={6} xs={24} >
                                <Form.Item className="label">
                                    <Input name="model" placeholder="model" onChange={handleInput} required />
                                </Form.Item >
                            </Col>
                            <Col lg={6} md={6} xs={24} >
                                <Form.Item className="label">
                                    <Input name="buyer" placeholder="buyer#" onChange={handleInput} />
                                </Form.Item >
                            </Col>
                            <Col lg={3} md={6} xs={24} >
                                <Form.Item className="label">
                                    <Input name="lot" placeholder="#lot" onChange={handleInput} />
                                </Form.Item >
                            </Col>

                            <Col lg={3} md={6} xs={24} >
                                <Form.Item className="label">
                                    <Select name="measure" defaultValue="cm" onChange={handleMeasurement} >
                                        {Measurement}
                                    </Select >
                                </Form.Item >
                            </Col>

                            <Col lg={3} md={6} xs={24} >
                                <Form.Item className="label">
                                    <Input name="height" placeholder="height" onChange={handleInput} required />
                                </Form.Item >
                            </Col>

                            <Col lg={3} md={6} xs={24} >
                                <Form.Item className="label">
                                    <Input name="width" placeholder="width" onChange={handleInput} required />
                                </Form.Item >
                            </Col>
                            <Col lg={3} md={6} xs={24} >
                                <Form.Item className="label">
                                    <Input name="dimension" placeholder="dimension" onChange={handleInput} />
                                </Form.Item >
                            </Col>

                            <Col lg={3} md={6} xs={24} >
                                <Form.Item className="label">
                                    <Input name="weight" placeholder="kgs" onChange={handleInput} required />
                                </Form.Item >
                            </Col>
                        </div>
                    }

                    {showDrycargo &&
                        <div>
                            <Col lg={6} md={6} xs={24} >
                                <Form.Item className="label">
                                    <Input name="PO" placeholder="enter #PO" onChange={handleInput} required />
                                </Form.Item >
                            </Col>

                            <Col lg={3} md={6} xs={24} >
                                <Form.Item className="label">
                                    <Input name="cargoDestination" placeholder="cargo destination" onChange={handleInput} required />
                                </Form.Item >
                            </Col>

                            <Col lg={6} md={6} xs={24} >
                                <Form.Item className="label">
                                    <Input name="PObuyer" placeholder="buyer#" onChange={handleInput} />
                                </Form.Item >
                            </Col>
                            <Col lg={3} md={6} xs={24} >
                                <Form.Item className="label">
                                    <Input name="POlot" placeholder="#lot" onChange={handleInput} />
                                </Form.Item >
                            </Col>

                            <Col lg={3} md={6} xs={24} >
                                <Form.Item className="label">
                                    <Select name="measure" defaultValue="cm" onChange={handlePOmeasurement} required >
                                        {Measurement}
                                    </Select >
                                </Form.Item >
                            </Col>

                            <Col lg={3} md={6} xs={24} >
                                <Form.Item className="label">
                                    <Input name="POheight" placeholder="height" onChange={handleInput} required />
                                </Form.Item >
                            </Col>

                            <Col lg={3} md={6} xs={24} >
                                <Form.Item className="label">
                                    <Input name="POwidth" placeholder="width" onChange={handleInput} required />
                                </Form.Item >
                            </Col>
                            <Col lg={3} md={6} xs={24} >
                                <Form.Item className="label">
                                    <Input name="POdimension" placeholder="dimension" onChange={handleInput} required />
                                </Form.Item >
                            </Col>

                            <Col lg={3} md={6} xs={24} >
                                <Form.Item className="label">
                                    <Input name="POweight" placeholder="kgs" onSubmit={handleInput} required />
                                </Form.Item >
                            </Col>
                        </div>
                    }
                </Row>

                <br />
                <Button
                    type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '30%' }} onSubmit={onSubmit}
                >
                    Submit
                        </Button>
            </form>

        </div>
    )
}

export default InlandRequest