let coin = document.querySelector(".coin");
let head = document.querySelector(".head");
let ans = document.querySelector(".ans");

const clickFun = async (e) => {
	coin.classList.remove("coin-before");
	coin.classList.add("coin-after");
	ans.setAttribute("hidden", true);
	const res = await fetch(`/toss`);
	console.log(res);
	if (res.ok) {
		const data = await res.json();
		console.log(data.flip);
		ans.innerHTML = data.flip.toUpperCase();
		setTimeout(() => {
			coin.classList.add("coin-before");
			coin.classList.remove("coin-after");
			ans.removeAttribute("hidden");
		}, 2000);
	}
};
coin.addEventListener("click", clickFun);
