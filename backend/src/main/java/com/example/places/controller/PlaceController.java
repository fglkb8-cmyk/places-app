package com.example.places.controller;

import com.example.places.dto.MessageResponse;
import com.example.places.dto.PlaceListItem;
import com.example.places.dto.PlaceRequest;
import com.example.places.entity.Place;
import com.example.places.service.PlaceService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/places")
public class PlaceController {

    private final PlaceService placeService;

    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }

    /** GET /places 場所一覧取得 */
    @GetMapping
    public List<PlaceListItem> list() {
        return placeService.findAll();
    }

    /** GET /places/{place_id} 場所詳細取得 */
    @GetMapping("/{place_id}")
    public Place detail(@PathVariable("place_id") Long placeId) {
        return placeService.find(placeId);
    }

    /** POST /places 場所登録 */
    @PostMapping
    public ResponseEntity<Place> create(@Valid @RequestBody PlaceRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(placeService.create(request));
    }

    /** PUT /places/{place_id} 場所更新 */
    @PutMapping("/{place_id}")
    public Place update(@PathVariable("place_id") Long placeId,
                        @Valid @RequestBody PlaceRequest request) {
        return placeService.update(placeId, request);
    }

    /** DELETE /places/{place_id} 場所削除 */
    @DeleteMapping("/{place_id}")
    public MessageResponse delete(@PathVariable("place_id") Long placeId) {
        placeService.delete(placeId);
        return new MessageResponse("削除しました");
    }
}
