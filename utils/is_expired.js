const now = Date.now();

const isExpired = expiresIn => {
	console.log("ExpiresIn", expiresIn * 1000);
	console.log("DATE", now);
};
isExpired(3600);