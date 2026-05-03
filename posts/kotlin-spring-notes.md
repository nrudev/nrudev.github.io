---
title: Kotlin과 Spring Boot, 그 사이의 작은 패턴들
date: 2026-04-12
summary: 금융권 백엔드를 다루며 자주 마주친 작은 결정들 — null 다루기, 트랜잭션 경계, 그리고 테스트가 알려주는 것.
---

Kotlin으로 Spring Boot 서비스를 만들 때, 작은 결정들이 쌓여 코드의 톤을 만듭니다. 큰 아키텍처보다 자주 마주치는 작은 것들에 대해 적어 봅니다.

## 1. null은 경계에서만

도메인 안에서는 `null`을 거의 쓰지 않습니다. `null`이 들어올 수 있는 자리는 외부 입력의 경계 — 컨트롤러, 외부 API 어댑터 — 뿐입니다. 그 이후로는 `Result`나 `sealed interface`로 표현 가능한 상태로 바꿔둡니다.

```kotlin
sealed interface PaymentResult {
    data class Approved(val txId: String) : PaymentResult
    data class Declined(val reason: String) : PaymentResult
    data object Pending : PaymentResult
}
```

호출 측에서 `when`이 모든 경우를 강제하기 때문에, "혹시 null이면?"이라는 질문이 사라집니다.

## 2. 트랜잭션은 유스케이스 단위로

서비스 메서드 하나하나에 `@Transactional`을 붙이는 대신, **유스케이스 단위**로 트랜잭션 경계를 잡습니다. 트랜잭션 안에서 외부 호출을 하지 않는다는 단순한 규칙만 지켜도, 운영 환경의 많은 문제가 줄어듭니다.

## 3. 테스트는 결정을 기록한다

> 이 코드가 왜 이렇게 생겼는지 설명하는 가장 좋은 방법은, 그렇게 생기지 않으면 깨지는 테스트입니다.

테스트는 검증 도구이기 전에 **의사결정의 기록**입니다. PR을 다시 읽을 미래의 자신과 동료를 위해, 한 줄의 주석보다 한 개의 실패 테스트를 남기는 편을 택합니다.

---

작은 패턴들이 모이면 어느 순간 코드의 톤이 됩니다. 다음 글에서는 트랜잭션 경계와 동시성 처리에 대해 조금 더 깊게 다뤄볼 생각입니다.
