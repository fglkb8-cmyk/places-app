package com.example.places.config;

import com.example.places.entity.Login;
import com.example.places.entity.Place;
import com.example.places.repository.LoginRepository;
import com.example.places.repository.PlaceRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/** 起動時に、動作確認用の初期データを登録する（データが空のときだけ） */
@Component
public class DataInitializer implements ApplicationRunner {

    private final LoginRepository loginRepository;
    private final PlaceRepository placeRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(LoginRepository loginRepository,
                           PlaceRepository placeRepository,
                           PasswordEncoder passwordEncoder) {
        this.loginRepository = loginRepository;
        this.placeRepository = placeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (loginRepository.count() == 0) {
            // ログインID: user / パスワード: password
            loginRepository.save(new Login("user", passwordEncoder.encode("password")));
        }
        if (placeRepository.count() == 0) {
            placeRepository.save(newPlace("swell Cafe", "愛媛県松山市", "カフェ", "一人でも入りやすい"));
            placeRepository.save(newPlace("道後温泉", "愛媛県松山市", "温泉", null));
            placeRepository.save(newPlace("松山城", "愛媛県松山市", "観光地", "天守からの眺めを見たい"));
        }
    }

    private Place newPlace(String name, String area, String category, String memo) {
        Place place = new Place();
        place.setName(name);
        place.setArea(area);
        place.setCategory(category);
        place.setMemo(memo);
        return place;
    }
}
