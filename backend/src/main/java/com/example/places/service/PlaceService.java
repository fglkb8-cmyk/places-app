package com.example.places.service;

import com.example.places.dto.PlaceListItem;
import com.example.places.dto.PlaceRequest;
import com.example.places.entity.Place;
import com.example.places.exception.NotFoundException;
import com.example.places.repository.PlaceRepository;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PlaceService {

    private final PlaceRepository placeRepository;

    public PlaceService(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    /** 一覧（登録順） */
    @Transactional(readOnly = true)
    public List<PlaceListItem> findAll() {
        return placeRepository.findAll(Sort.by("placeId")).stream()
                .map(p -> new PlaceListItem(p.getPlaceId(), p.getName(), p.getArea(), p.getCategory()))
                .toList();
    }

    /** 詳細（なければ404） */
    @Transactional(readOnly = true)
    public Place find(Long placeId) {
        return placeRepository.findById(placeId)
                .orElseThrow(() -> new NotFoundException("指定された場所が見つかりません"));
    }

    @Transactional
    public Place create(PlaceRequest request) {
        Place place = new Place();
        apply(place, request);
        return placeRepository.save(place);
    }

    @Transactional
    public Place update(Long placeId, PlaceRequest request) {
        Place place = find(placeId);
        apply(place, request);
        return placeRepository.save(place);
    }

    @Transactional
    public void delete(Long placeId) {
        Place place = find(placeId);
        placeRepository.delete(place);
    }

    private void apply(Place place, PlaceRequest request) {
        place.setName(request.name().trim());
        place.setArea(request.area().trim());
        place.setCategory(request.category());
        String memo = request.memo();
        place.setMemo(memo == null || memo.isBlank() ? null : memo.trim());
    }
}
