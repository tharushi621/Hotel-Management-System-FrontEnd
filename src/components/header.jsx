import UserData from "./userData.jsx";

function Header() {
  return (
    <header className="w-full bg-blue-700 flex h-[100px] relative items-center p-[10px]">
      <h1 className="text-[30px] text-white">Leonine Villa</h1>
      <UserData imageLink="https://img.freepik.com/premium-vector/user-icon-vector_1272330-86.jpg" name="Tharushi Bhagya" />
      
    </header>
  );
}
export default Header;
 