package com.example.places.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @JsonProperty("login_id")
        @NotBlank(message = "ログインIDを入力してください")
        String loginId,

        @NotBlank(message = "パスワードを入力してください")
        String password) {
}
