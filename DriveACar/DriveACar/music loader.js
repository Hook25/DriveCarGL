var player = function (num_of_songs, folder) {
    var self = this;
    this.index = 0;
    this.count = num_of_songs;
    this.source = { obj: document.createElement("source"), folder: folder };

    this.create_player = function (name) {
        var player = document.createElement("audio");
        self.source.obj.src = name;
        player.appendChild(self.source.obj);
        return player;
    }
    this.player = this.create_player(folder + "/" + "0.mp3");
    this.play_or_pause = function () {  // enter
        if (self.player.paused)
            self.player.play();
        else
            self.player.pause();
    }

    this.next = function () {   // numpad 6
        if (self.index < self.count - 1)
            self.index++;
        else
            self.index = 0;
        self.change_song(self.index + ".mp3");
    }

    this.last = function () {   // numpad 4
        if (self.index == 0)
            self.index = self.count - 1;
        self.change_song(self.index + ".mp3");
    }
    // event listener part
    var _switch = [
    [13, this.play_or_pause],
    [100, this.last],
    [102, this.next]
    ];
    document.addEventListener("keydown", function switch_input(e) {
        for (var i = 0; i < _switch.length; i++)
            if (_switch[i][0] == e.keyCode)
                _switch[i][1]();
    });
    //end event listener part


    this.change_song = function (name) {
        self.player.pause();
        self.player = self.create_player(folder + "/" + name);
        self.player.play();
    }

}
var folder = "mp3";
var number_of_songs_in_the_folder = 10;
var v = new player(number_of_songs_in_the_folder,folder);

