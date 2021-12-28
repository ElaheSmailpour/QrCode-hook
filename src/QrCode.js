import { Button, Card, CardContent, Container, Grid, makeStyles, TextField } from "@material-ui/core"
import QRCode from 'qrcode'
import QrReader from 'react-qr-reader'
import { useRef, useState } from "react";
const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 10
    },
    title: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "aqua",
        color: "white",
        padding: 20
    },
    btn: {
        marginTop: 10,
        marginBottom: 20,
        background: "blue",
        color: "white"
    }
}))
const QrCode = () => {
    const [text, setText] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [scanResultFile, setScanResultFile] = useState("")
    const [scanResultWebcam, setScanResultWebcam] = useState("")
    const qrRef = useRef(null)
    const classes = useStyles()

    const generateQrCode = async () => {
        try {
            const response = await QRCode.toDataURL(text)

            console.log("response=", response)
            setImageUrl(response)
        } catch (error) {
            console.log("error=", error)
        }
    }
    const handleErrorFile = (error) => {
        console.log("handleErrorFile=", error)
    }
    const handleScanFile = (result) => {
        if (result) {
            setScanResultFile(result)
        }

    }
    const onScanFile = () => {
        qrRef.current.openImageDialog()
    }
    const handleErrorWebcam = (error) => {
        console.log("handleErrorWebcam=", error)
    }

    const handleScanWebcam = (result) => {
        if (result) {
            setScanResultWebcam(result)
        }
    }
    return (

        <Container className={classes.container}>
            <Card>
                <h2 className={classes.title}>Generate Download</h2>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>

                            <TextField label="text your here" onChange={(e) => setText(e.target.value)} />
                            <Button className={classes.btn} variant="contented" color="primary" onClick={() => generateQrCode()}>Generate</Button>
                            <br />
                            {imageUrl ? (<a href={imageUrl} download>
                                (<img src={imageUrl} alt="img" />
                            </a>) : null}

                        </Grid>
                        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                            <Button className={classes.btn} variant="contented" color="secondry" onClick={onScanFile} >Scan Qr Code</Button>
                            <QrReader
                                ref={qrRef}
                                delay={300}
                                onError={handleErrorFile}
                                onScan={handleScanFile}
                                style={{ width: '100%' }}
                                legacyMode
                            />
                            <h3>Scanned Code:{scanResultFile}</h3>
                        </Grid>
                        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                            <h3>Qr-Code scan by webcam</h3>

                            <QrReader
                                delay={300}
                                onError={handleErrorWebcam}
                                onScan={handleScanWebcam}
                                style={{ width: '100%' }}
                            />

                            <h3>scanned by webcam code:{scanResultWebcam}</h3>
                        </Grid>
                    </Grid>


                </CardContent>
            </Card >
        </Container >

    )
}

export default QrCode


