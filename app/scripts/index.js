const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const LoginBtn = document.getElementById("login");

LoginBtn.addEventListener("click", async () => {

    const data = new FormData();

    data.append("username", usernameInput.value);
    data.append("password", passwordInput.value);

    const response = await axios("http://localhost/expense_tracker/server/login.php",{

        method: "POST",
        data: data, 
    });
    if(response.data.status === "Login Successful"){
        console.log(response.data)
        localStorage.setItem("user_id", JSON.parse(response.data.user.id))
        window.location.href = "../page/transactions.html"
    }else{
        console.log("problem")
    }

})