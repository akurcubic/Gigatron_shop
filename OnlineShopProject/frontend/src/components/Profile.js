import { useState } from "react";
import axios from "axios";

import face from '../icons/face.png';
import google from '../icons/google.png';
import phone from '../icons/phone.png';

const Profile = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [res, setRes] = useState("");

    const handleLogIn = async() => {

        try{

            const response = await axios.post(`http://localhost:4000/api/users/login`, {
                             
                    email: email,
                    password: password
                },
                {
                    withCredentials: true
                }
            );
            console.log(response.data.message);
            setRes(response.data.message);
            

        }catch(err){

            console.log("Greska prilikom prijavljivanja.")
        }

    };

    return(
        <div style={{background: "#F2F2F2", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <div style={{background: "white", border: "none", width: "30%", height: 700, margin: 60, padding: 50, display: "flex", flexDirection: "column", gap: 15}}>
                <p style={{marginBottom: 0, fontSize: 25, fontWeight: 400}}>Vas Gigatron nalog</p>
                <div style={{display: "flex", alignItems: "center", gap: 5}}>
                    <p style={{marginBottom: 0, fontSize: 15}}>Nemate Gigatron nalog?</p>
                    <a style={{marginBottom: 0, fontSize: 15}} href="">Registruje se brzo i lako.</a>
                </div>
                <div>
                    <p style={{marginBottom: 0, fontSize: 15}}>E-mail</p>
                    <input style={{width: "100%", padding: 8, border: "1px solid rgb(170, 170, 170)", borderRadius: 5}} type="text" value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
                </div>
                <div>
                    <p style={{marginBottom: 0, fontSize: 15}}>Lozinka</p>
                    <input style={{width: "100%", padding: 8, border: "1px solid rgb(170, 170, 170)", borderRadius: 5}} type="text" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
                </div>
                <a style={{marginBottom: 0, fontSize: 15}} href="">Prijavite se</a>
                <button style={{width: "100%", background: "rgb(64, 63, 158)", color: "white", padding: 8, border: "none", borderRadius: 10, fontWeight: 400}} onClick={() => {handleLogIn()}} >Prijavite se</button>
                <div style={{display: "flex", alignItems: "center", gap: 5}}>
                    <div style={{width: "100%" ,height: "1px", background: "rgb(170, 170, 170)"}}></div>
                    <p style={{marginBottom: 0, fontSize: 15, color: "rgb(170, 170, 170)", whiteSpace: "nowrap"}}>Odaberite drugu opciju za prijavu</p>
                    <div style={{width: "100%" ,height: "1px", background: "rgb(170, 170, 170)"}}></div>
                </div>
                <div style={{display: "flex", alignItems: "center", gap: 20}}>
                    <div style={{flex: "0 0 30%", display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: 5, paddingTop: 5, paddingLeft: 20, paddingRight: 20, border: "1px solid rgb(170, 170, 170)"}}>
                        <img src = {face} alt="Picture" style={{width: 40, height: 40}}></img>
                    </div>
                    <div style={{flex: "0 0 30%",display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: 5, paddingTop: 5, paddingLeft: 20, paddingRight: 20, border: "1px solid rgb(170, 170, 170)"}}>
                        <img src = {google} alt="Picture" style={{width: 35, height: 35}}></img>
                    </div>
                    <div style={{flex: "0 0 30%",display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: 5, paddingTop: 5, paddingLeft: 20, paddingRight: 20, border: "1px solid rgb(170, 170, 170)"}}>
                        <img src = {phone} alt="Picture" style={{width: 33, height: 33}}></img>
                    </div>
                </div>

                <div style={{padding: 15, border:"1px solid rgb(170, 170, 170)", borderRadius: 10}}>
                    Kupovinom kao registrovani kupac ostvarujete pravo na<br></br>Gigatron bodove koji vam donose i do 50% pri<br></br> sledecoj.kupovini.
                </div>

            </div>
            
            
        </div>
    );

};

export default Profile;