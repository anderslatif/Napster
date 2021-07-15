window.api.receive("fromMain", (data) => {
	console.log(`Received ${data} from main process`);
});
window.api.send("toMain", "some data");

            // receive initializePlaylist and call the store like this:
            // playlist.initializePlaylist();

