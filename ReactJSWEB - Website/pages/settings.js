import React, {useState} from 'react';
import { useRouter } from 'next/router'
import AdminLayout from "../components/AdminLayout";
import Typography from "@material-ui/core/Typography";


export default function Setting() {
    const router = useRouter()
    const [userId, setUserId] = useState("");
    const [nMode, setNMode] = useState(true);

    return (
        <AdminLayout setNMode={setNMode} setUserId={setUserId}>
            <Typography variant="h5" gutterBottom style={{color: "grey", marginTop:15}}>
                Setting
            </Typography>
        </AdminLayout>
    )
}