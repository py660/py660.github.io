self.addEventListener('fetch', function(event) {
    const newRequest = new Request(event.request, {
        headers: {
                    "X-Requested-With": "ReplitApi",
                    "referer": "https://replit.com/",
                    "User-Agent": "Mozilla/5.0"
                  },
        mode: "cors"
    });
    return fetch(newRequest);
});

console.log("loaded");
